# Use uma imagem oficial do PHP com Apache
FROM php:8.1-apache

# Copie os arquivos do projeto para o diretório do servidor Apache
COPY . /var/www/html

# Ajuste permissões, se necessário
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Exponha a porta padrão do Apache
EXPOSE 80

# Inicie o servidor Apache
CMD ["apache2-foreground"]
