FROM php:8.3-apache

# Extensions nécessaires
RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql

# Activer mod_rewrite
RUN a2enmod rewrite

WORKDIR /var/www/html

COPY . .

RUN chown -R www-data:www-data storage bootstrap/cache

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

EXPOSE 80