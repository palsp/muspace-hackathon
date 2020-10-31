import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { OrderResolverService } from "./resolver/order-resolver.service";
const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "size",
    loadChildren: () =>
      import("./size/size.module").then((m) => m.SizePageModule),
  },
  {
    path: "size/:plantNo",
    loadChildren: () =>
      import("./size/size.module").then((m) => m.SizePageModule),
  },
  {
    path: "upload-image",
    loadChildren: () =>
      import("./upload-image/upload-image.module").then(
        (m) => m.UploadImagePageModule
      ),
  },
  {
    path: "upload-image/:id/:userName",
    loadChildren: () =>
      import("./upload-image/upload-image.module").then(
        (m) => m.UploadImagePageModule
      ),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then((m) => m.RegisterPageModule),
  },
  {
    path: "manage",
    loadChildren: () =>
      import("./manage/manage.module").then((m) => m.ManagePageModule),
  },
  {
    path: "manage/:size/:available/:plantNo",
    loadChildren: () =>
      import("./manage/manage.module").then((m) => m.ManagePageModule),
  },
  {
    path: "harvest",
    loadChildren: () =>
      import("./harvest/harvest.module").then((m) => m.HarvestPageModule),
  },
  {
    path: "harvest/:id",
    resolve: {
      special: OrderResolverService,
    },
    loadChildren: () =>
      import("./harvest/harvest.module").then((m) => m.HarvestPageModule),
  },
  {
    path: "deliver",
    loadChildren: () =>
      import("./deliver/deliver.module").then((m) => m.DeliverPageModule),
  },
  {
    path: "deliver/:id",
    resolve: {
      special: OrderResolverService,
    },
    loadChildren: () =>
      import("./deliver/deliver.module").then((m) => m.DeliverPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
