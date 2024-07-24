package net.service.v2.room.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "rooms")
public class Room {
   
	public Room(Long id, Long roomNumber, String roomType, String miniBar, Boolean available) {
		super();
		this.id = id;
		this.roomType = roomType;
		this.miniBar = miniBar;
		this.available = available;
	}
	public Room(){}

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column(name = "room_number", nullable = false)
    private Long roomNumber;
	
	@Column(name = "room_type", nullable = false)
    private String roomType;



	@Column(name = "mini_bar",  nullable = false)
    private String miniBar;
    
    @Column(name = "available", nullable = false)
    private Boolean available;

    // Getters and Setters
    public Long getRoomNumber() {
    	return roomNumber;
    }
    public void setRoomNumber(Long roomNumber) {
    	this.roomNumber = roomNumber;
    }

    public Long getId() {
    	return id;
    }
    
    public void setId(Long id) {
    	this.id = id;
    }

    public String getRoomType() {
    	return roomType;
    }
    
    public void setRoomType(String roomType) {
    	this.roomType = roomType;
    }
    
    public String getMiniBar() {
    	return miniBar;
    }
    
    public void setMiniBar(String miniBar) {
    	this.miniBar = miniBar;
    }
   
    
    public Boolean getAvailable() {
    	return available;
    }
    
    public void setAvailable(Boolean available) {
    	this.available = available;
    }
}