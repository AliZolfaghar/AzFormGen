// @ts-nocheck
import { wrap } from "svelte-spa-router/wrap";
import { replace } from "svelte-spa-router";
// import { userStore } from "./stores/userStore";
// import { get } from "svelte/store";
// let user = get(userStore);

const checkUserLogin = (detail) => {
    // console.log(detail)
    // console.log(user)
    return true;
};

const routes = {
    "/": wrap({
        asyncComponent: () => import("./pages/Home.svelte"),
    }),

    "/home": wrap({
        asyncComponent: () => import("./pages/Home.svelte"),
    }),

    "/login": wrap({
        asyncComponent: () => import("./pages/Login.svelte"),
    }),

    "/logout": wrap({
        asyncComponent: () => import("./pages/Logout.svelte"),
    }),

    "/register": wrap({
        asyncComponent: () => import("./pages/Register.svelte"),
    }),


    "/components": wrap({
        asyncComponent: () => import("./pages/Components.svelte"),
    }),

    "/formgenerator": wrap({
        asyncComponent: () => import("./pages/FormGenerator.svelte"),
    }),

    // "/logout": wrap({
    //     asyncComponent: () => import("./pages/logout.svelte"),
    // }),

    // "/about": wrap({
    //     asyncComponent: () => import("./pages/About.svelte"),
    // }),

    // // "/menu": wrap({
    // //     asyncComponent: () => import("./pages/menu/Menu.svelte"),
    // // }),

    // "/menu/:subpage?/:id?": wrap({
    //     asyncComponent: () => import("./pages/menu/Menu.svelte"),
    // }),

    // "/counter/:order_id?": wrap({
    //     asyncComponent: () => import("./pages/counter/Counter.svelte"),
    // }),

    // "/SplitOrder/:order_id": wrap({
    //     asyncComponent: () => import("./pages/counter/SplitOrder.svelte"),
    // }),

    // "/posts/:post_id?": wrap({
    //     asyncComponent: () => import("./pages/Posts.svelte"),
    //     conditions: [(detail) => checkUserLogin(detail)],
    // }),

    // "/user/setting/:subpage?": wrap({
    //     asyncComponent: () => import("./pages/user/UserSetting.svelte"),
    // }),

    // "/admin/menu/items/:item_id/:category_id": wrap({
    //     asyncComponent: () => import("./pages/admin/menu/EditMenuItem.svelte"),
    // }),

    // // ALL ADMIN PARTS ( BACKOFFICE ) WILL BE AVAILABLE IN /admin PATH
    // "/admin/menu/:subpage?": wrap({
    //     asyncComponent: () => import("./pages/admin/Menu.svelte"),
    // }),

    // // admin/users
    // "/admin/users/:id?": wrap({
    //     asyncComponent: () => import("./pages/admin/users/Users.svelte"),
    // }),

    // // admin/taxes
    // "/admin/taxes/:id?": wrap({
    //     asyncComponent: () => import("./pages/admin/taxes/Taxes.svelte"),
    // }),

    // // admin/allergens
    // "/admin/allergens/:id?": wrap({
    //     asyncComponent: () => import("./pages/admin/allergens/Allergens.svelte"),
    // }),

    // // admin/appconfig
    // "/admin/appconfig/:section?": wrap({
    //     asyncComponent: () => import("./pages/admin/appconfig/AppConfig.svelte"),
    // }),

    // // admin/appconfig
    // "/admin/floorPlan/:id?": wrap({
    //     asyncComponent: () => import("./pages/admin/floorPlan/FloorPlan.svelte"),
    // }),

    // // admin/kitchens
    // "/admin/kitchens/:id?": wrap({
    //     asyncComponent: () => import("./pages/admin/kitchens/Kitchen.svelte"),
    // }),


    // // admin/ingredients
    // "/admin/ingredients/:id?": wrap({
    //     asyncComponent: () => import("./pages/admin/ingredients/ingredients.svelte"),
    // }),

    // // receipes
    // "/admin/recipes/:id?": wrap({
    //     asyncComponent: () => import("./pages/admin/recipes/Recipes.svelte"),
    // }),


    // // waste
    // "/wastes/:id?": wrap({
    //     asyncComponent: () => import("./pages/wastes/Wastes.svelte"),
    // }),



    // "/uisample": wrap({
    //     asyncComponent: () => import("./pages/uisample/UiSample.svelte"),
    // }),

    // "/storesample": wrap({
    //     asyncComponent: () => import("./pages/storesample/StoreSample.svelte"),
    // }),

    // catch all other routes as notfound page
    "*": wrap({
        asyncComponent: () => import("./pages/NotFound.svelte"),
    }),
};

export default routes;
