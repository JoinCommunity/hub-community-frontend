import { createModule } from "@evyweb/ioctopus";
import { DISymbol } from "src/shared/di/symbols";
import { CrashlyticsService } from "src/layers/infrastructure/services/crashlytics.service";
import HttpService from "src/layers/infrastructure/services/http.service";

export function createServiceModule() {
  const moduleService = createModule();

  moduleService
    .bind(DISymbol.ICrashlyticsService)
    .toClass(CrashlyticsService, []);

  moduleService
    .bind(DISymbol.IHttpService)
    .toClass(HttpService, [DISymbol.ICrashlyticsService]);

  return moduleService;
}
