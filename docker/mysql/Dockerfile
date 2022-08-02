FROM mysql:8

EXPOSE 3306

COPY ./learn-nestjs.cnf /etc/mysql/conf.d

RUN chown root:root  /etc/mysql/conf.d/learn-nestjs.cnf
RUN chmod 664 /etc/mysql/conf.d/learn-nestjs.cnf

CMD ["mysqld"]
