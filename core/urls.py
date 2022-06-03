from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from store.products.views import store_view

urlpatterns = [
    # core
    path("admin/", admin.site.urls),
    # 3rd parties
    path("accounts/", include("allauth.urls")),
    path("stripe/", include("djstripe.urls", namespace="djstripe")),
    path("markdownx/", include("markdownx.urls")),
    # local
    path("", store_view, name="index"),
    path("customers/", include("users.urls")),
    path("shop/", include("store.products.urls")),
    path("shop/wishlist/", include("store.wishlist.urls")),
    path("shop/cart/", include("store.cart.urls")),
    path("shop/cart/checkout/", include("store.checkout.urls")),
    path("shop/cart/checkout/order/", include("store.orders.urls")),
    path("shop/product/", include("store.reviews.urls")),
    path("classes/", include("classes.urls")),
    path("blog/", include("blog.urls")),
    path("contact/", include("contact.urls")),
    path("dashboard/admin/", include("admin_dashboard.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    if "debug_toolbar" in settings.INSTALLED_APPS:
        urlpatterns += [
            path("__debug__/", include("debug_toolbar.urls")),
        ]
