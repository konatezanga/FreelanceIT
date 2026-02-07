FROM php:8.3-apache

# Installer dépendances système
RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql

# Activer mod_rewrite
RUN a2enmod rewrite

# DocumentRoot vers /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

WORKDIR /var/www/html

# Copier le projet
COPY . .

# Permissions Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

# Copier le fichier .env si nécessaire
RUN if [ ! -f .env ]; then cp .env.example .env; fi

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Configurer Laravel (clé, migration, cache)
RUN php artisan key:generate --force
RUN php artisan migrate --force || true
RUN php artisan config:clear
RUN php artisan cache:clear
RUN php artisan route:clear
RUN php artisan optimize:clear
RUN php artisan config:cache

EXPOSE 80