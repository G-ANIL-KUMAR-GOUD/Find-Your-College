# Find Your College - Backend

This is the backend service for the **Find Your College** project.  
It is built using **Java Spring Boot** and provides REST APIs to support the frontend application.

---

##  Features
- RESTful API endpoints for fetching college data
- Filter functionality (branch, gender, rank, etc.)
- Secure and modular code structure
- Easy integration with the Angular frontend

---

##  Tech Stack
- **Java 17** (or your Java version)
- **Spring Boot** (Web, JPA, etc.)
- **Maven** for dependency management
- **MySQL / PostgreSQL** (specify your DB)

---

##  Project Structure
├── src/main/java/... # Application source code
├── src/main/resources/ # Config files (application.properties, etc.)
├── pom.xml # Maven configuration


---

##   Setup & Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/Find-Your-College.git
cd Find-Your-College/Backend

```

### 2️⃣  Configure the database
 

Edit the src/main/resources/application.properties file:

```
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

mvn clean install
mvn spring-boot:run

http://localhost:8080
