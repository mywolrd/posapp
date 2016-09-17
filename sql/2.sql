create table if not exists pos.item_types (
	id		  serial		primary key,
	name	  varchar(50)	not null,
	active	  boolean		default true,
	weight	  smallint,
    createdAt timestamp,
    updatedAt timestamp,
    createdBy smallint,
    updatedBy smallint
);

create table if not exists pos.items (
    id 	      serial     	primary key,
    name      varchar(50)   null,
    type      integer 		references pos.item_types(id),
    dollar    smallint,
    cent      smallint,
    active    boolean		default true,
    weight    smallint,
    createdAt timestamp,
    updatedAt timestamp,
    createdBy smallint,
    updatedBy smallint
);

create table if not exists pos.addon_items (
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

grant select, insert, delete, update on pos.items to pos;
grant usage, select on sequence pos.items_id_seq to pos;

grant select, insert, delete, update on pos.addOnItems to pos;
grant usage, select on sequence pos.addOnItems_id_seq to pos;
