package com.pfa.pfabackend.config;

import com.pfa.pfabackend.model.Admin;
import com.pfa.pfabackend.model.Client;
import com.pfa.pfabackend.model.Demande;
import com.pfa.pfabackend.model.User;
import com.pfa.pfabackend.enums.DemandeStatus;
import com.pfa.pfabackend.enums.DemandeType;
import com.pfa.pfabackend.enums.Role;
import com.pfa.pfabackend.repository.AdminRepository;
import com.pfa.pfabackend.repository.ClientRepository;
import com.pfa.pfabackend.repository.DemandeRepository;
import com.pfa.pfabackend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class DatabaseInit implements CommandLineRunner {

    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final ClientRepository clientRepository;
    private final DemandeRepository demandeRepository;
    private final PasswordEncoder passwordEncoder;
    private static final String PASSWORD = "password";

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Initialize Admin
        initAdmin();

        // Initialize Clients and Demandes
        initClientsAndDemandes();

        System.out.println("Database initialization completed.");
    }

    @Transactional
    private void initAdmin() {
        String adminEmail = "admin@admin.com";
        Optional<User> existingUser = userRepository.findByEmail(adminEmail);

        if (existingUser.isEmpty()) {
            // Create Admin User
            User adminUser = User.builder()
                    .lastname("Admin")
                    .firstname("Super")
                    .email(adminEmail)
                    .phone("123456789")
                    .password(passwordEncoder.encode(PASSWORD))
                    .role(Role.ADMIN)
                    .created_at(new Date())
                    .update_at(new Date())
                    .build();
            userRepository.save(adminUser);

            // Create Admin Entity
            Admin admin = Admin.builder().user(adminUser).build();
            adminRepository.save(admin);
        } else {
            System.out.println("Admin with email " + adminEmail + " already exists, skipping creation.");
        }
    }

    @Transactional
    private void initClientsAndDemandes() {
        // Create 10 Clients
        for (int i = 1; i <= 10; i++) {
            String clientEmail = "client" + i + "@example.com";
            Optional<User> existingClientUser = userRepository.findByEmail(clientEmail);

            if (existingClientUser.isEmpty()) {
                // Create Client User
                User clientUser = User.builder()
                        .lastname("Client" + i)
                        .firstname("Test" + i)
                        .email(clientEmail)
                        .phone("987654321" + i)
                        .password(passwordEncoder.encode(PASSWORD))
                        .role(Role.CLIENT)
                        .created_at(new Date())
                        .build();
                userRepository.save(clientUser);

                // Create Client Entity
                Client client = Client.builder().user(clientUser).build();
                clientRepository.save(client);

                // Create 10 Demandes for Each Client
                for (int j = 1; j <= 10; j++) {
                    Demande demande = Demande.builder()
                            .description("Demande description for Client " + i + " - Demande " + j)
                            .date(new java.sql.Date(new Date().getTime()))
                            .notif("Notification for demande " + j)
                            .status(DemandeStatus.PENDING)
                            .type(DemandeType.values()[j % 3])
                            .client(client)
                            .build();
                    demandeRepository.save(demande);
                }
            } else {
                System.out.println("Client with email " + clientEmail + " already exists, skipping creation.");
            }
        }
    }
}