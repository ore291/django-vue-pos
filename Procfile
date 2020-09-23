release: python ./manage collectstatic --noinput
web: gunicorn backend.wsgi --log-file -
