package com.supera.server.service.impl;

import com.supera.server.model.Cliente;
import com.supera.server.repository.ClienteRepository;
import com.supera.server.service.IClienteService;
import org.springframework.data.jpa.repository.JpaRepository;

public class ClienteServiceImpl extends CrudServiceImpl<Cliente, Long> implements IClienteService {
    private final ClienteRepository clienteRepository;

    public ClienteServiceImpl(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Override
    protected JpaRepository<Cliente, Long> getRepository() {
        return clienteRepository;
    }
}
