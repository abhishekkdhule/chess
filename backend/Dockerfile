# Base image
FROM python:3.8-slim

# Set working directory
WORKDIR /app

# Install pipenv
RUN pip install pipenv

# Copy Pipfile and Pipfile.lock
COPY Pipfile Pipfile.lock ./

# Install dependencies
RUN pipenv install --system --deploy

# Copy the rest of the application
COPY . .

# Expose the port and start the application
EXPOSE 5000
CMD ["python", "main.py"]
