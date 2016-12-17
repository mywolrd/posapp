create table if not exists pos.customer (
	id        serial        primary key,
	lastName  varchar(30)   not null,
	firstName varchar(30)   null,
	pnumber   varchar(50)   null,
	createdAt timestamp,
	updatedAt timestamp,
    createdBy smallint,
    updatedBy smallint
);

grant select, insert, delete, update on pos.customer to pos;
grant select, usage on sequence pos.customer_id_seq to pos;
