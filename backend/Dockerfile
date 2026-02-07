FROM php:8.3-apache

# Installer dépendances
RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    git \
    postgresql-client \
    && docker-php-ext-install pdo pdo_pgsql

# Activer mod_rewrite
RUN a2enmod rewrite

# DocumentRoot vers /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

WORKDIR /var/www/html

COPY . .

# Permissions Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Installer les dépendances
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copier .env si disponible, sinon créer un exemple
RUN if [ -f .env ]; then echo ".env exists"; else cp .env.example .env; fi

# Générer la clé d'application (sans force pour éviter les erreurs)
RUN php artisan key:generate

# Exécuter les scripts de découverte de packages
RUN composer run-script post-autoload-dump

# Copier l'entrypoint
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80

ENTRYPOINT ["entrypoint.sh"]