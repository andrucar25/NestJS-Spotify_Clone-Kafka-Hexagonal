# Mini Spotify Clone - Backend

This is a mini Spotify clone backend project implemented with a **microservices architecture**. The main endpoints to test the application are exposed through the **Gateway microservice**. Below is a detailed description of the project and the technologies used.

---

## 🛠️ Technologies Used

- **Backend Framework**: [NestJS](https://nestjs.com/) (Node.js framework for building efficient and scalable server-side applications).
- **Architecture**:
  - **Microservices Architecture**: For modularity and scalability.
  - **Hexagonal Architecture**: For clean separation of business logic and infrastructure.
- **Message Broker**: [Apache Kafka] for communication between microservices.
- **Database**: [PostgreSQL] for data storage.
- **Authentication**: [JWT (JSON Web Tokens)] for secure user authentication.

---

### Key Functionalities

- **User Management**:
  - Create and edit user profiles.
  - Authenticate users via login (protected route with JWT token).

- **Playlist Management**:
  - Create playlists.
  - Automatically save songs to playlists based on their genre.

- **Song Management**:
  - Upload and save songs.
  - Stream songs that have been saved.v

---

## 📂 Project Structure

The project is organized into the following microservices:

1. **Gateway Microservice**:
   - Acts as the entry point for all external requests.
   - Routes requests to the appropriate microservices.

2. **Auth Microservice**:
   - Handles user authentication and JWT token generation.

3. **Users Microservice**:
   - Manages user-related operations (e.g., creating, updating, and retrieving user data).

4. **Playlists Microservice**:
   - Manages playlists and their associated songs.

5. **Songs Microservice**:
   - Handles song-related operations (e.g., uploading, streaming, and managing songs).

---

## 🔧 How to Run the Project

### Prerequisites

- Docker and Docker Compose
- pnpm
- Some Database management tool that supports postgresql like Dbeaver, tableplus.

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/andrucar25/mini-spotify-clone.git
   cd mini-spotify-clone

2. **Up the proyect**:
   ```bash
   docker compose up

3. **Open a database manager for postgresql**:
   For user database the credentials:
   host: localhost
   port: 5342
   username: admin
   password: 12345
   database name: user_db

   Para playlist database the credentials:
   host: localhost
   port: 5433
   username: admin
   password: 12345
   database name: playlist_db

---

# 🚀 Testing the Functional Flow

After cloning the repository and starting the Docker containers, follow these steps to test the functional flow of the application:

## 1. Create a User  
**Endpoint:**  
`POST http://localhost:3000/api/users`

**Body:**  

```json
{
  "email": "test@example.com",
  "password": "123456",
  "username": "test"
}
```

## 2. Log in the User 
**Endpoint:**  
`POST http://localhost:3000/api/users`

**Body:**  

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```
Response:
You will receive a JWT token. Use this token for authenticated routes.


## 3. Create a Playlist
**Endpoint:**  
`POST http://localhost:3000/api/playlists `

- **Headers**:
```makefile
Authorization: Bearer token
(use the token received from the login step)

**Body:**  

```json
{
  "name": "indie rock playlist",
  "description": "example of description",
  "musicalGenre": "indie rock"
}
```

## 4. Upload a Song  
**Endpoint:**  
`POST http://localhost:3000/api/songs`

**Headers:**  
```makefile
Authorization: Bearer token
(use the token received from the login step)

**Body(form-data):**  

```json
{
  file: The audio file to upload (must be an MP3 file under 5MB).
  musicalGenre: The genre of the song (must match the genre of the playlist created earlier).
}
```

Example:
```json
{
  file: tlspsong.mp3
  musicalGenre: indie rock
}
```
Note:
When the song is saved, a message is sent via Kafka to the Playlist microservice to add the song to the playlist with the matching genre.


## 5. Stream the Song
Open a browser and navigate to:

`http://localhost:3040/songs/stream/<song_filename>`
Replace <song_filename> with the name of the song file, including the .mp3 extension. For example:

Example:
`http://localhost:3040/songs/stream/0ba29dcd-374a-4f4c-96a9-c3c485308d3a-opening-dragonball.mp3`


