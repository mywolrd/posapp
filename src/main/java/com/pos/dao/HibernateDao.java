package com.pos.dao;

import java.io.Serializable;
import java.util.List;

public interface HibernateDao<T, ID extends Serializable> {

    List<T> list();

    List<T> listByIds(List<Long> idList);

    T uniqueForId(ID id);

    T save(T entity);

    T update(T entity);

    T saveOrUpdate(T entity);
}