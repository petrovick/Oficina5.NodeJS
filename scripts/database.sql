create table User (
  idUser bigint not null auto_increment primary key,
  name varchar(100) not null,
  password_hash varchar(100) not null,
  isActive bit not null,
  email varchar(100) not null
);
