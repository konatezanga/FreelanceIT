#!/bin/bash
set -e

echo "=== Démarrage de l'application ==="

# Attendre que la base de données soit prête (pour Neon, ça devrait être instantané)
echo "Vérification de la connexion à la base de données..."
if [ -n "$DB_HOST" ] && [ -n "$DB_PORT" ]; then
    timeout 30 bash -c "until echo > /dev/tcp/$DB_HOST/$DB_PORT; do sleep 2; done" 2>/dev/null || true
fi

# Configurer le fichier .env si les variables d'environnement existent
if [ ! -f .env ]; then
    echo "Création du fichier .env à partir de .env.example..."
    cp .env.example .env
fi

# Mettre à jour les variables de base de données dans .env
echo "Configuration des variables de base de données..."
if [ -n "$DB_HOST" ]; then
    sed -i "s/DB_HOST=.*/DB_HOST=$DB_HOST/" .env
fi
if [ -n "$DB_PORT" ]; then
    sed -i "s/DB_PORT=.*/DB_PORT=$DB_PORT/" .env
fi
if [ -n "$DB_DATABASE" ]; then
    sed -i "s/DB_DATABASE=.*/DB_DATABASE=$DB_DATABASE/" .env
fi
if [ -n "$DB_USERNAME" ]; then
    sed -i "s/DB_USERNAME=.*/DB_USERNAME=$DB_USERNAME/" .env
fi
if [ -n "$DB_PASSWORD" ]; then
    # Échapper les caractères spéciaux pour sed
    ESCAPED_PASSWORD=$(echo "$DB_PASSWORD" | sed 's/[\/&]/\\&/g')
    sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=$ESCAPED_PASSWORD/" .env
fi
if [ -n "$DB_CONNECTION" ]; then
    sed -i "s/DB_CONNECTION=.*/DB_CONNECTION=$DB_CONNECTION/" .env
else
    sed -i "s/DB_CONNECTION=.*/DB_CONNECTION=pgsql/" .env
fi

# SSL pour Neon PostgreSQL
sed -i "s/DB_SSL_MODE=.*/DB_SSL_MODE=require/" .env || echo "DB_SSL_MODE=require" >> .env

# Générer la clé d'application si elle n'existe pas
if ! grep -q "^APP_KEY=base64:" .env; then
    echo "Génération de la clé d'application..."
    php artisan key:generate --force
fi

# Optimiser Laravel
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Exécuter les migrations
echo "Exécution des migrations..."
php artisan migrate --force

# Fixer les permissions
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "=== Démarrage du serveur web ==="
exec apache2-foreground