package com.supera.server.service.impl;

import com.supera.server.model.Person;
import com.supera.server.repository.PersonRepository;
import com.supera.server.service.IPersonService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class PersonServiceImpl extends CrudServiceImpl<Person, Long> implements
        IPersonService {
    private final PersonRepository personRepository;

    public PersonServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    protected JpaRepository<Person, Long> getRepository() {
        return personRepository;
    }
}
