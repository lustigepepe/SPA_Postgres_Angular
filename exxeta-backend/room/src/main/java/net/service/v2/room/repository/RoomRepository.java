package net.service.v2.room.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import net.service.v2.room.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
}