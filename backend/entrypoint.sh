#!/bin/bash
set -e

echo "=== Démarrage de l'application Laravel ==="

# Configurer .env
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Mettre à jour les variables DB
envsubst < .env > .env.tmp && mv .env.tmp .env

# Clé d'application
if ! grep -q "^APP_KEY=base64:" .env; then
    php artisan key:generate --force
fi

# Migrations
echo "Exécution des migrations..."
php artisan migrate --force

# Nettoyage simple (sans toucher à la table cache)
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Permissions
chown -R www-data:www-data storage bootstrap/cache

echo "=== Démarrage d'Apache ==="
exec apache2-foreground