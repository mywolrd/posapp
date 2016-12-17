create table if not exists pos.item_type (
	id		  serial		primary key,
	name	  varchar(50)	not null,
	active	  boolean		default true,
	weight	  smallint,
    createdAt timestamp,
    updatedAt timestamp,
    createdBy smallint,
    updatedBy smallint
);

create table if not exists pos.item (
    id 	      serial     	primary key,
    name      varchar(50)   null,
    type      integer 		references pos.item_type(id),
    dollar    smallint,
    cent      smallint,
    active    boolean		default true,
    weight    smallint,
    createdAt timestamp,
    updatedAt timestamp,
    createdBy smallint,
    updatedBy smallint
);

create table if not exists pos.addon_item (
    id         serial       primary key,
    name       varchar(50)  not null,
    dollar     smallint,
    cent       smallint,
    weight     smallint,
    active     boolean		default true,
    createdAt  timestamp,
    updatedAt  timestamp,
    createdBy  smallint,
    updatedBy  smallint
);

grant select, insert, delete, update on pos.item_type to pos;
grant usage, select on sequence pos.item_type_id_seq to pos;

grant select, insert, delete, update on pos.item to pos;
grant usage, select on sequence pos.item_id_seq to pos;

grant select, insert, delete, update on pos.addon_item to pos;
grant usage, select on sequence pos.addon_item_id_seq to pos;
