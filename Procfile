release: python ./manage collectstatic migrate
web: gunicorn backend.wsgi --log-file -
