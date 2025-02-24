// package com.pfa.pfabackend.config;

// import com.github.javafaker.Faker;
// import com.pfa.pfabackend.enums.Auth;
// import com.pfa.pfabackend.enums.DemandeStatus;
// import com.pfa.pfabackend.enums.DemandeType;
// import com.pfa.pfabackend.enums.Role;
// import com.pfa.pfabackend.model.*;
// import com.pfa.pfabackend.repository.*;
// import lombok.RequiredArgsConstructor;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.transaction.annotation.Transactional;

// import java.sql.Date;
// import java.util.Random;

// @Configuration
// @RequiredArgsConstructor
// public class DatabaseInit implements CommandLineRunner {

//     private static final String PASSWORD = "password";
//     private final UserRepository userRepository;
//     private final ClientRepository clientRepository;
//     private final AdminRepository adminRepository;
//     private final CodeConfirmationRepository codeConfirmationRepository;
//     private final DemandeRepository demandeRepository;
//     private final PasswordEncoder passwordEncoder;
//     private final Faker faker = new Faker();
//     private final Random random = new Random();

//     @Override
//     public void run(String... args) {
//         initAdmin();
//         // initClients(200); 
//     }

//     @Transactional
//     private void initAdmin() {
//         // Create an admin user
//         User adminUser = User.builder()
//                 .lastname("Admin")
//                 .firstname("User")
//                 .email("admin@example.com")
//                 .phone(faker.phoneNumber().phoneNumber())
//                 .password(passwordEncoder.encode(PASSWORD))
//                 .role(Role.ADMIN)
//                 .created_at(new Date(System.currentTimeMillis()))
//                 .build();

//         // Save the admin user
//         adminUser = userRepository.saveAndFlush(adminUser);

//         // Create an admin entity linked to the user
//         Admin admin = Admin.builder()
//                 .user(adminUser)
//                 .build();

//         // Save the admin
//         adminRepository.save(admin);

//         System.out.println("Admin initialized successfully.");
//     }

//     @Transactional
//     private void initClients(int numberOfClients) {
//         for (int i = 0; i < numberOfClients; i++) {
//             // Create a client user
//             User clientUser = User.builder()
//                     .lastname(faker.name().lastName())
//                     .firstname(faker.name().firstName())
//                     .email(faker.internet().emailAddress())
//                     .phone(faker.phoneNumber().phoneNumber())
//                     .password(passwordEncoder.encode(PASSWORD))
//                     .role(Role.CLIENT)
//                     .created_at(new Date(System.currentTimeMillis()))
//                     .build();

//             // Save the client user
//             clientUser = userRepository.saveAndFlush(clientUser);

//             // Create a client entity linked to the user
//             Client client = Client.builder()
//                     .auth(Auth.EMAIL)
//                     .user(clientUser)
//                     .build();

//             // Save the client
//             client = clientRepository.save(client);

//             // Add a confirmation code for the client
//             addCodeConfirmation(client);

//             // Add a demande for the client
//             addDemande(client);
//         }

//         System.out.println(numberOfClients + " clients initialized successfully.");
//     }

//     private void addCodeConfirmation(Client client) {
//         CodeConfirmation codeConfirmation = CodeConfirmation.builder()
//                 .code(faker.internet().uuid())
//                 .expiration_date(new Date(System.currentTimeMillis() + 86_400_000)) // 24 hours later
//                 .client(client)
//                 .build();

//         // Save the confirmation code
//         codeConfirmationRepository.save(codeConfirmation);
//     }

//     private void addDemande(Client client) {
//         // Randomly select a demande type
//         DemandeType randomType = DemandeType.values()[random.nextInt(DemandeType.values().length)];

//         Demande demande = Demande.builder()
//                 .description(faker.lorem().paragraph())
//                 .date(new Date(System.currentTimeMillis()))
//                 .notif(faker.lorem().sentence())
//                 .status(DemandeStatus.PENDING)
//                 .type(randomType)
//                 .client(client)
//                 .build();

//         // Save the demande
//         demandeRepository.save(demande);
//     }
// }