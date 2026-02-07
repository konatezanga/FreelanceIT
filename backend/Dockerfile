FROM php:8.3-apache

# Installer dépendances système
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_pgsql zip

# Activer mod_rewrite
RUN a2enmod rewrite

# DocumentRoot vers /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

WORKDIR /var/www/html

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copier tout d'abord les fichiers nécessaires pour composer
COPY composer.json composer.lock ./

# Installer les packages Laravel
RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader --no-scripts

# Copier tout le projet
COPY . .

# Copier .env.example si .env n'existe pas
RUN if [ ! -f .env ]; then cp .env.example .env; fi

# Permissions Laravel
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Exécuter composer dump-autoload pour générer l'autoloader
RUN composer dump-autoload --optimize

EXPOSE 80

# Commande de démarrage qui exécute les commandes artisan
CMD ["sh", "-c", "php artisan key:generate --force && php artisan config:cache && php artisan route:cache && apache2-foreground"]