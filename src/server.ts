import express, { Application } from "express";
import path from "path";

import { UserRoute } from "./routes/user.route";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDoc from "./swagger.json";

// language
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";

// setup i18next
i18next
  .use(Backend)                     // Connects the file system backend
  .use(middleware.LanguageDetector) // Enables automatic language detection
  .init({
    backend: {
      loadPath: path.join(process.cwd(), 'src/locales', '{{lng}}', '{{ns}}.json'), // Path to translation files
    },
    detection: {
      order: ['querystring', 'cookie'], // Priority: URL query string first, then cookies
      caches: ['cookie'],               // Cache detected language in cookies
    },
    fallbackLng: 'fr',                   // Default language when no language is detected
    preload: ['en', 'fr'],               // Preload these languages at startup,
    resources: {
      en: en,
      fr: fr
    }
  });

  
export const setupRestEndPoint = (app: Application) => {

  app.use(
    middleware.handle(i18next)
  );

  app.use(express.json());
  app.use("/", UserRoute());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};
