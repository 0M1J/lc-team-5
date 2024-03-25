FROM python:3.9 

ADD requirements.txt ./api/requirements.txt
WORKDIR app
RUN pip install --upgrade -r /api/requirements.txt
ADD . . 

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
