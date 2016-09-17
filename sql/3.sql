create table if not exist pos.orders (
	id         	serial 		primary key,
	customerId 	integer,
	completed  	boolean		default false,
	voided		boolean		default false,
	dropDate   	timestamp,
	readyDate  	timestamp,
	pickupDate 	timestamp,
	createdAt  	timestamp,
	updatedAt  	timestamp,
    createdBy  	smallint,
    updatedBy  	smallint
);

create table if not exist pos.order_details (
	id        serial    primary key,
    orderId   integer   references pos.orders(id),
    itemId    integer   references pos.items(id),
    quantity  smallint,
    newdollar smallint,
    newcent   smallint
);

create table if not exist pos.order_details_addon_items (
	id				serial	primary key,
	addOnItemId     integer references pos.addon_items(id),
	orderDetailsId 	integer references pos.order_details(id),
	newdollar  		smallint,
	newcent    		smallint
);

grant select, insert, delete, update on pos.order_details_addon_items to pos;
grant select, usage on sequence pos.order_details_addon_items_id_seq to pos;

grant select, insert, delete, update on pos.order_details to pos;
grant select, usage on sequence pos.order_details_id_seq to pos;

grant select, insert, delete, update on pos.orders to pos;
grant select, usage on sequence pos.orders_id_seq to pos;





