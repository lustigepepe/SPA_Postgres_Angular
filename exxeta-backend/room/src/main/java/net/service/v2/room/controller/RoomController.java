package net.service.v2.room.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.service.v2.room.exception.ResourceNotFoundException;
import net.service.v2.room.model.Room;
import net.service.v2.room.repository.RoomRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v2/")
public class RoomController {
	
	@Autowired
	private RoomRepository roomRepository;
	
	// get all rooms
	@GetMapping("/rooms")
	public List<Room> getAllRooms(){
		return roomRepository.findAll();
	}		
	
	// create room rest api
	@PostMapping("/rooms")
	public Room createRoom(@RequestBody Room room) {
		return roomRepository.save(room);
	}
	
	// get room by id rest api
	@GetMapping("/rooms/{id}")
	public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
		Room room = roomRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Room not exist with id :" + id));
		return ResponseEntity.ok(room);
	}
	
	// update room rest api
	@PutMapping("/rooms/{id}")
	public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody Room roomDetails){
		Room room = roomRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Room not exist with id :" + id));
	
		room.setRoomNumber(roomDetails.getRoomNumber());		
		room.setRoomType(roomDetails.getRoomType());
		room.setMiniBar(roomDetails.getMiniBar());
		room.setAvailable(roomDetails.getAvailable());
		
		Room updatedRoom = roomRepository.save(room);
		return ResponseEntity.ok(updatedRoom);
	}
	
	// delete room rest api
	@DeleteMapping("/rooms/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteRoom(@PathVariable Long id){
		Room room = roomRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Room not exist with id :" + id));
		roomRepository.delete(room);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
