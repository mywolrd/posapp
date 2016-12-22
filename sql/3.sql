create table if not exists pos.order (
	id         	serial 		primary key,
	customerId 	integer,
	active    	boolean,
	completed  	boolean		default false,
	voided		boolean		default false,
	quantity    smallint,
	dollar    smallint,
	cent    smallint,
	dropDate   	timestamp,
	readyDate  	timestamp,
	pickupDate 	timestamp,
	createdAt  	timestamp,
	updatedAt  	timestamp,
    createdBy  	smallint,
    updatedBy  	smallint
);

create table if not exists pos.order_detail (
	id        	serial    primary key,
    itemId    	integer   references pos.item(id),
    quantity  	smallint,
    newdollar 	smallint,
    newcent   	smallint,
    active    	boolean,
    createdAt  	timestamp,
    updatedAt  	timestamp,
    createdBy  	smallint,
    updatedBy  	smallint
);

create table if not exists pos.order_details_map (
  order_id 	integer not null references pos.order(id),
  orderdetail_id	integer not null references pos.order_detail(id)
);

create table if not exists pos.order_detail_addon_item (
	id				serial	primary key,
	addonItemId     integer references pos.addon_item(id),
	newdollar  		smallint,
	newcent    		smallint,
	active    		boolean,
	createdAt  		timestamp,
    updatedAt  		timestamp,
    createdBy  		smallint,
    updatedBy  		smallint
);

create table if not exists pos.order_detail_addon_items_map (
  orderdetail_id 	integer not null references pos.order_detail(id),
  orderdetailaddonitem_id	integer not null references pos.order_detail_addon_item(id)
);

grant select, insert, delete, update on pos.order_detail_addon_item to pos;
grant select, usage on sequence pos.order_detail_addon_item_id_seq to pos;

grant select, insert, delete, update on pos.order_detail to pos;
grant select, usage on sequence pos.order_detail_id_seq to pos;

grant select, insert, delete, update on pos.order to pos;
grant select, usage on sequence pos.order_id_seq to pos;

grant select, insert, delete, update on pos.order_detail_addon_items_map to pos;
grant select, insert, delete, update on pos.order_details_map to pos;