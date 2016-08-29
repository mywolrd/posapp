create table pos.items (
    id 	      serial         primary key,
    name      varchar(50)    null,
    type      varchar(50)    not null,
    dollar    smallint,
    cent      smallint,
    active    boolean		default true,
    createdAt timestamp,
    updatedAt timestamp,
    createdBy smallint,
    updatedBy smallint
);

create table pos.addon_items (
    id         serial       primary key,
    name       varchar(50)  not null,
    dollar     smallint,
    cent       smallint,
    active     boolean		default true,
    createdAt  timestamp,
    updatedAt  timestamp,
    createdBy  smallint,
    updatedBy  smallint
);

grant select, insert, delete, update on pos.items to pos;
grant usage, select on sequence pos.items_id_seq to pos;

grant select, insert, delete, update on pos.addOnItems to pos;
grant usage, select on sequence pos.addOnItems_id_seq to pos;
