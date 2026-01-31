# Database Configuration

<cite>
**Referenced Files in This Document**
- [drizzle.config.ts](file://drizzle.config.ts)
- [server/db.ts](file://server/db.ts)
- [server/storage.ts](file://server/storage.ts)
- [shared/schema.ts](file://shared/schema.ts)
- [server/routes.ts](file://server/routes.ts)
- [server/index.ts](file://server/index.ts)
- [package.json](file://package.json)
- [README.md](file://README.md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Conclusion](#conclusion)
10. [Appendices](#appendices)

## Introduction
This document explains the database configuration and Drizzle ORM setup for the Personal Showcase application. It covers how the application connects to PostgreSQL via the pg driver, how Drizzle ORM is configured and used, and how the system gracefully falls back to in-memory storage during development when a database is unavailable. It also documents environment variable handling, migration management, schema synchronization, and operational guidance for development, staging, and production environments.

## Project Structure
The database-related configuration and runtime logic are distributed across a few key files:
- Drizzle configuration defines migration output and schema location.
- A dedicated database connection module initializes a PostgreSQL connection pool and a Drizzle instance.
- A storage abstraction layer exposes a unified interface and selects either a database-backed implementation or an in-memory implementation based on environment availability.
- The shared schema defines the database tables and Zod validation schemas.
- Routes and server bootstrap integrate the storage layer and seed data on startup.

```mermaid
graph TB
subgraph "Server"
IDX["server/index.ts"]
RT["server/routes.ts"]
DB["server/db.ts"]
ST["server/storage.ts"]
end
subgraph "Shared"
SCH["shared/schema.ts"]
end
subgraph "Drizzle"
CFG["drizzle.config.ts"]
end
IDX --> RT
RT --> ST
ST --> DB
DB --> SCH
CFG --> SCH
```

**Diagram sources**
- [server/index.ts](file://server/index.ts#L1-L103)
- [server/routes.ts](file://server/routes.ts#L1-L66)
- [server/db.ts](file://server/db.ts#L1-L12)
- [server/storage.ts](file://server/storage.ts#L1-L323)
- [shared/schema.ts](file://shared/schema.ts#L1-L86)
- [drizzle.config.ts](file://drizzle.config.ts#L1-L15)

**Section sources**
- [drizzle.config.ts](file://drizzle.config.ts#L1-L15)
- [server/db.ts](file://server/db.ts#L1-L12)
- [server/storage.ts](file://server/storage.ts#L1-L323)
- [shared/schema.ts](file://shared/schema.ts#L1-L86)
- [server/routes.ts](file://server/routes.ts#L1-L66)
- [server/index.ts](file://server/index.ts#L1-L103)

## Core Components
- Drizzle configuration: Defines migration output directory, schema file, PostgreSQL dialect, and reads the connection URL from the DATABASE_URL environment variable.
- Database connection module: Creates a PostgreSQL connection pool using the pg driver and initializes a Drizzle instance bound to the shared schema. When DATABASE_URL is absent, both the pool and the Drizzle instance are null.
- Storage abstraction: Implements a unified interface for retrieving data and submitting messages. It selects a database-backed implementation when a pool exists, otherwise falls back to an in-memory implementation. It also seeds default data on startup when the database is empty.
- Shared schema: Declares all tables and Zod insert schemas for validation.
- Routes and server bootstrap: Register API endpoints and seed data on application startup.

**Section sources**
- [drizzle.config.ts](file://drizzle.config.ts#L1-L15)
- [server/db.ts](file://server/db.ts#L1-L12)
- [server/storage.ts](file://server/storage.ts#L1-L323)
- [shared/schema.ts](file://shared/schema.ts#L1-L86)
- [server/routes.ts](file://server/routes.ts#L1-L66)
- [server/index.ts](file://server/index.ts#L1-L103)

## Architecture Overview
The application supports two operational modes:
- Production mode with PostgreSQL: DATABASE_URL is present, a connection pool is created, Drizzle is initialized, migrations are applied, and the database-backed storage is used.
- Development mode without PostgreSQL: DATABASE_URL is absent, the application uses in-memory storage and seeds default data for immediate local development.

```mermaid
sequenceDiagram
participant Boot as "server/index.ts"
participant Routes as "server/routes.ts"
participant Storage as "server/storage.ts"
participant DB as "server/db.ts"
participant Schema as "shared/schema.ts"
Boot->>Routes : registerRoutes()
Routes->>Storage : seedData()
alt DATABASE_URL present
Storage->>DB : use DatabaseStorage
DB->>Schema : bind drizzle to schema
else DATABASE_URL missing
Storage->>Storage : use MemStorage
end
Routes-->>Boot : routes registered
```

**Diagram sources**
- [server/index.ts](file://server/index.ts#L62-L102)
- [server/routes.ts](file://server/routes.ts#L12-L13)
- [server/storage.ts](file://server/storage.ts#L321-L323)
- [server/db.ts](file://server/db.ts#L1-L12)
- [shared/schema.ts](file://shared/schema.ts#L1-L86)

## Detailed Component Analysis

### Drizzle Configuration (drizzle.config.ts)
- Purpose: Centralizes Drizzle Kit configuration for generating and applying migrations.
- Key behaviors:
  - Validates that DATABASE_URL is present; throws if missing.
  - Sets migration output directory and schema file path.
  - Uses PostgreSQL dialect and passes the DATABASE_URL to dbCredentials.
- Migration commands:
  - The project defines a script to push schema changes to the database using Drizzle Kit.

```mermaid
flowchart TD
Start(["Load drizzle.config.ts"]) --> CheckURL["Check DATABASE_URL env var"]
CheckURL --> |Missing| ThrowErr["Throw error and halt"]
CheckURL --> |Present| Configure["Set out, schema, dialect, dbCredentials.url"]
Configure --> End(["Export config"])
```

**Diagram sources**
- [drizzle.config.ts](file://drizzle.config.ts#L1-L15)

**Section sources**
- [drizzle.config.ts](file://drizzle.config.ts#L1-L15)
- [package.json](file://package.json#L11-L11)

### Database Connection Module (server/db.ts)
- Purpose: Initialize a PostgreSQL connection pool and a Drizzle ORM instance bound to the shared schema.
- Key behaviors:
  - Creates a Pool using the pg driver when DATABASE_URL is present.
  - Initializes drizzle with the pool and the shared schema.
  - Exports pool and db; both are null when DATABASE_URL is absent.

```mermaid
flowchart TD
A["Import pg and schema"] --> B["Check DATABASE_URL"]
B --> |Present| C["Create Pool(connectionString)"]
C --> D["Initialize drizzle(pool, { schema })"]
B --> |Missing| E["pool = null"]
E --> F["db = null"]
D --> G["Export pool and db"]
F --> G
```

**Diagram sources**
- [server/db.ts](file://server/db.ts#L1-L12)

**Section sources**
- [server/db.ts](file://server/db.ts#L1-L12)

### Storage Abstraction (server/storage.ts)
- Purpose: Provide a unified interface for data access and submission, with automatic fallback behavior.
- Key behaviors:
  - IStorage interface defines getters for profile, education, experience, skills, awards, publications, and a method to create messages.
  - DatabaseStorage uses the Drizzle instance to fetch data and insert messages; throws if db is null.
  - MemStorage provides in-memory collections and a seeded dataset; used when DATABASE_URL is absent.
  - Automatic selection: storage is set to DatabaseStorage if DATABASE_URL is present, otherwise MemStorage.
  - Startup seeding: seedData() checks for existing data and inserts defaults when empty.

```mermaid
classDiagram
class IStorage {
+getProfile() Promise
+getEducation() Promise
+getExperience() Promise
+getSkills() Promise
+getAwards() Promise
+getPublications() Promise
+createMessage(message) Promise
+seedData() Promise
}
class DatabaseStorage {
+getProfile() Promise
+getEducation() Promise
+getExperience() Promise
+getSkills() Promise
+getAwards() Promise
+getPublications() Promise
+createMessage(message) Promise
+seedData() Promise
}
class MemStorage {
+getProfile() Promise
+getEducation() Promise
+getExperience() Promise
+getSkills() Promise
+getAwards() Promise
+getPublications() Promise
+createMessage(message) Promise
+seedData() Promise
}
IStorage <|.. DatabaseStorage
IStorage <|.. MemStorage
```

**Diagram sources**
- [server/storage.ts](file://server/storage.ts#L9-L323)

**Section sources**
- [server/storage.ts](file://server/storage.ts#L1-L323)

### Shared Schema (shared/schema.ts)
- Purpose: Define database tables and Zod insert schemas for validation.
- Tables: profile, education, experience, skills, awards, publications, messages.
- Validation: Zod insert schemas are generated for each table to validate incoming data.

```mermaid
erDiagram
PROFILE {
serial id PK
text name
text title
text bio
text email
text location
text linkedin
text orcid
text scopus
}
EDUCATION {
serial id PK
text degree
text institution
text year
text details
}
EXPERIENCE {
serial id PK
text role
text company
text period
text description
}
SKILLS {
serial id PK
text category
text_array items
}
AWARDS {
serial id PK
text title
text issuer
text date
text description
}
PUBLICATIONS {
serial id PK
text title
text journal
text year
text link
text authors
}
MESSAGES {
serial id PK
text name
text email
text message
timestamp created_at
}
```

**Diagram sources**
- [shared/schema.ts](file://shared/schema.ts#L7-L64)

**Section sources**
- [shared/schema.ts](file://shared/schema.ts#L1-L86)

### Routes and Application Bootstrap (server/routes.ts, server/index.ts)
- Purpose: Register API endpoints and orchestrate application startup.
- Key behaviors:
  - registerRoutes() seeds data and registers GET endpoints for profile, education, experience, skills, awards, and publications, plus a POST endpoint for contact submissions.
  - server/index.ts sets up logging middleware, error handling, development/production behavior, and starts the HTTP server on the configured port.

```mermaid
sequenceDiagram
participant Server as "server/index.ts"
participant Routes as "server/routes.ts"
participant Storage as "server/storage.ts"
Server->>Routes : registerRoutes()
Routes->>Storage : seedData()
Routes-->>Server : routes registered
Server->>Server : start HTTP server
```

**Diagram sources**
- [server/index.ts](file://server/index.ts#L62-L102)
- [server/routes.ts](file://server/routes.ts#L12-L13)
- [server/storage.ts](file://server/storage.ts#L60-L225)

**Section sources**
- [server/routes.ts](file://server/routes.ts#L1-L66)
- [server/index.ts](file://server/index.ts#L1-L103)

## Dependency Analysis
- Drizzle configuration depends on the shared schema and the DATABASE_URL environment variable.
- The database connection module depends on the pg driver and the shared schema.
- The storage abstraction depends on the database connection module and the shared schema.
- Routes depend on the storage abstraction and the shared routes definitions.

```mermaid
graph LR
CFG["drizzle.config.ts"] --> SCH["shared/schema.ts"]
DB["server/db.ts"] --> SCH
ST["server/storage.ts"] --> DB
ST --> SCH
RT["server/routes.ts"] --> ST
```

**Diagram sources**
- [drizzle.config.ts](file://drizzle.config.ts#L1-L15)
- [server/db.ts](file://server/db.ts#L1-L12)
- [server/storage.ts](file://server/storage.ts#L1-L323)
- [shared/schema.ts](file://shared/schema.ts#L1-L86)
- [server/routes.ts](file://server/routes.ts#L1-L66)

**Section sources**
- [drizzle.config.ts](file://drizzle.config.ts#L1-L15)
- [server/db.ts](file://server/db.ts#L1-L12)
- [server/storage.ts](file://server/storage.ts#L1-L323)
- [shared/schema.ts](file://shared/schema.ts#L1-L86)
- [server/routes.ts](file://server/routes.ts#L1-L66)

## Performance Considerations
- Connection pooling: The pg Pool is created with the DATABASE_URL and reused across requests. This avoids per-request connection overhead and improves throughput under load.
- Schema binding: Drizzle is bound to the shared schema, enabling efficient query generation and type-safe operations.
- In-memory fallback: During development without a database, the in-memory storage avoids network latency and enables rapid iteration.
- Migration strategy: Drizzle Kit is used to push schema changes; ensure migrations are applied in staging and production before deploying application updates.

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
- Missing DATABASE_URL:
  - Symptom: Drizzle configuration throws an error or the application uses in-memory storage.
  - Resolution: Set DATABASE_URL to a valid PostgreSQL connection string. For local development, you can skip DATABASE_URL to use in-memory storage.
- Drizzle configuration errors:
  - Symptom: Migration commands fail due to missing DATABASE_URL.
  - Resolution: Ensure DATABASE_URL is exported in the environment before running migration scripts.
- Database connectivity issues:
  - Symptom: Requests to database-backed endpoints fail or return empty arrays.
  - Resolution: Verify the PostgreSQL server is reachable, credentials are correct, and the database exists. Confirm the connection string format and network/firewall settings.
- In-memory vs database behavior:
  - Symptom: Data persists locally but not across restarts.
  - Resolution: Set DATABASE_URL to enable persistent storage. Data stored while in-memory is lost on restart.
- Seeding behavior:
  - Symptom: No default data appears in development.
  - Resolution: Ensure seedData() runs on startup and that DATABASE_URL is not set if you intend to use in-memory storage.

**Section sources**
- [drizzle.config.ts](file://drizzle.config.ts#L3-L5)
- [server/db.ts](file://server/db.ts#L7-L11)
- [server/storage.ts](file://server/storage.ts#L60-L225)
- [README.md](file://README.md#L48-L51)

## Conclusion
The Personal Showcase application is designed for plug-and-play operation. By default, it uses in-memory storage for seamless local development. When DATABASE_URL is provided, it switches to PostgreSQL via Drizzle ORM and the pg driver, enabling persistent storage and migrations. The shared schema ensures type safety and validation, while the storage abstraction cleanly separates concerns and simplifies environment-specific behavior.

[No sources needed since this section summarizes without analyzing specific files]

## Appendices

### Environment Variables and Configuration Examples
- DATABASE_URL: Required for PostgreSQL integration; used by Drizzle Kit, the database connection pool, and session stores that rely on it.
- Example values:
  - Local development (in-memory fallback): unset DATABASE_URL.
  - Production/Staging: set DATABASE_URL to a PostgreSQL connection string (e.g., postgresql://user:pass@host:5432/dbname).

**Section sources**
- [drizzle.config.ts](file://drizzle.config.ts#L3-L13)
- [server/db.ts](file://server/db.ts#L7-L11)
- [README.md](file://README.md#L48-L51)

### Migration Management and Schema Synchronization
- Migration commands:
  - Use the project’s script to push schema changes to the database.
- Drizzle Kit configuration:
  - Migration output directory and schema path are defined in the Drizzle configuration.
- Best practices:
  - Apply migrations in staging before promoting to production.
  - Keep schema definitions in the shared schema synchronized with the database.

**Section sources**
- [package.json](file://package.json#L11-L11)
- [drizzle.config.ts](file://drizzle.config.ts#L7-L14)

### Connection Pooling Strategies
- The pg Pool is initialized with the DATABASE_URL and reused for all database operations.
- Benefits:
  - Reduced connection overhead.
  - Improved concurrency handling.
- Recommendations:
  - Monitor pool usage in production.
  - Tune pool size and timeouts based on workload and database capacity.

**Section sources**
- [server/db.ts](file://server/db.ts#L5-L11)

### Automatic Database Setup Procedures
- Startup seeding:
  - On application boot, the storage layer seeds default data when the database is empty.
- In-memory fallback:
  - When DATABASE_URL is absent, the application uses in-memory storage and seeds default data for immediate local development.

**Section sources**
- [server/routes.ts](file://server/routes.ts#L12-L13)
- [server/storage.ts](file://server/storage.ts#L60-L225)
- [README.md](file://README.md#L48-L51)