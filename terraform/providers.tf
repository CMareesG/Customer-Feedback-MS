terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.63.0"
    }
  }
  backend "azurerm" {
    resource_group_name  = "rg-cfms-tf"
    storage_account_name = "sacfmstf"
    container_name       = "bccfmstf"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {

  }
  
}
