/*
 * Waiting List API
 *
 * Ambulance Waiting List management for Web-In-Cloud system
 *
 * API version: 1.0.0
 * Contact: <your_email>
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package ambulance_wl

import (
	"time"
)

type WaitingListEntry struct {

	// Unique ID of the entry in this waiting list
	Id string `json:"id"`

	// Name of the patient in the waiting list
	Name string `json:"name,omitempty"`

	// Unique identifier of the patient known to Web-In-Cloud system
	PatientId string `json:"patientId"`

	// Timestamp since when the patient entered the waiting list
	WaitingSince time.Time `json:"waitingSince"`

	// Estimated time of entering the ambulance. Ignored on POST.
	EstimatedStart time.Time `json:"estimatedStart,omitempty"`

	// Estimated duration of ambulance visit. If not provided, it will be computed based on condition and ambulance settings. 
	EstimatedDurationMinutes int32 `json:"estimatedDurationMinutes"`

	Condition Condition `json:"condition,omitempty"`
}
