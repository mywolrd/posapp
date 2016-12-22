package com.pos.dao.hibernate;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.pos.dao.HibernateDao;
import com.pos.utils.POSDatabaseException;

@Repository
public abstract class HibernateBaseDao<T, ID extends Serializable>
        implements HibernateDao<T, ID> {

    @Autowired
    private SessionFactory sessionFactory;

    private Class<T> persistentClass;

    @SuppressWarnings("unchecked")
    public HibernateBaseDao() {
        this.persistentClass = (Class<T>) ((ParameterizedType) this.getClass()
                .getGenericSuperclass()).getActualTypeArguments()[0];
    }

    protected Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    public Class<T> getPersistentClass() {
        return this.persistentClass;
    }

    public List<T> list() {
        return this.findByCriteria();
    }

    public List<T> listByIds(List<Long> idList) {
        return this.findByCriteria(Restrictions.in(DBNames.ID, idList));
    }

    @SuppressWarnings("unchecked")
    protected List<T> findByCriteria(Criterion... criterion) {
        try {
            Criteria criteria = this.getSession()
                    .createCriteria(this.getPersistentClass())
                    .setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
            for (Criterion c : criterion) {
                criteria.add(c);
            }
            return criteria.list();
        } catch (Exception exception) {
            throw new POSDatabaseException(exception);
        }
    }

    public T uniqueForId(ID id) {
        try {
            T entity = (T) this.getSession().get(this.getPersistentClass(), id);
            return entity;
        } catch (Exception exception) {
            throw new POSDatabaseException(exception);
        }
    }

    public T save(T entity) {
        try {
            this.getSession().save(entity);
            return entity;
        } catch (Exception exception) {
            throw new POSDatabaseException(exception);
        }
    }

    public T update(T entity) {
        try {
            this.getSession().update(entity);
            return entity;
        } catch (Exception exception) {
            throw new POSDatabaseException(exception);
        }
    }

    public T saveOrUpdate(T entity) {
        try {
            this.getSession().saveOrUpdate(entity);
            return entity;
        } catch (Exception exception) {
            throw new POSDatabaseException(exception);
        }
    }
}