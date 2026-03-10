terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.63.0"
    }
  }
  backend "azurerm" {
    resource_group_name  = "tfstate-rg"
    storage_account_name = "tfstatefile181"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {

  }
  
}


