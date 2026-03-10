

variable "location" {
  type    = string
  default = "centralindia"
}

variable "common_tags" {
  type = map(string)
  default = {
    Project     = "CustomerFeedbackMS"
    Environment = "Prod"
    Owner       = "udhayashankarj04@gmail.com"
    ManagedBy   = "Terraform"
  }
}