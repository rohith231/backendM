import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    //origin:
  });
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3000;
  console.log("Env Variable", JSON.stringify(process.env));
  await app.listen(process.env.PORT || 3000, function () {
    console.log(`Server listening on port ${port}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
