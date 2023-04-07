FROM python:3.11-alpine3.17

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./requirements.docker.txt /tmp/requirements.docker.txt

COPY . /app

WORKDIR /app

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    # installing necessary packages to install psycopg2 from source
    # because this version is more robust/efficient than psycopg2-binary
    apk add gcc musl-dev python3-dev libffi-dev openssl-dev && \
    apk add --update --no-cache postgresql-client && \
    apk add --update --no-cache --virtual .tmp-build-deps \
    build-base postgresql-dev musl-dev && \
    /py/bin/pip install -r /tmp/requirements.docker.txt \
    fi && \
    rm -rf /tmp && \
    # remove unnecessary packages used to build psycopg2
    apk del .tmp-build-deps && \
    adduser \
    --disabled-password \
    # --no-create-home \
    django-user

COPY dockercompose/django/entrypoint /entrypoint
RUN chmod +x /entrypoint

COPY dockercompose/django/start /start
RUN chmod +x /start

ENTRYPOINT ["/entrypoint"]

RUN chown -R django-user:django-user /app

USER django-user
