FROM python:3.8-slim-buster
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /app/backend

WORKDIR /app/backend
COPY ./backend/poetry.lock ./backend/pyproject.toml ./

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir poetry==1.1.6

RUN poetry config virtualenvs.create false
RUN poetry install --no-dev --no-interaction --no-ansi

COPY ./backend .
RUN chmod u+x ./docker-entrypoint.sh

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
