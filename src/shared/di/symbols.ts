import { ICrashlyticsService } from "src/layers/application/interfaces/services/crashlytics.service.interface";
import { IHttpService } from "src/layers/application/interfaces/services/http.service.interface";

export const DISymbol = {
  // Services
  IHttpService: Symbol.for("IHttpService"),
  ICrashlyticsService: Symbol.for("ICrashlyticsService"),

  // Repositories

  // Use Cases

  // Controllers
};

export type DIValue = {
  // Services
  IHttpService: IHttpService;
  ICrashlyticsService: ICrashlyticsService;

  // Repositories

  // Use Cases

  // Controllers
};
