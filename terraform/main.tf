resource "azurerm_resource_group" "rg-cfms" {
  name     = "rg-cfms"
  location = var.location
  tags     = var.common_tags
}

resource "azurerm_virtual_network" "vnet-cfms" {
  name                = "vnet-cfms"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.rg-cfms.location
  resource_group_name = azurerm_resource_group.rg-cfms.name
  tags                = var.common_tags
}

resource "azurerm_subnet" "subnet-cfms" {
  name                 = "subnet-cfms"
  resource_group_name  = azurerm_resource_group.rg-cfms.name
  virtual_network_name = azurerm_virtual_network.vnet-cfms.name
  address_prefixes     = ["10.0.2.0/24"]
}

resource "azurerm_network_security_group" "nsg-cfms" {
  name                = "nsg-cfms"
  location            = azurerm_resource_group.rg-cfms.location
  resource_group_name = azurerm_resource_group.rg-cfms.name
  tags                = var.common_tags

  security_rule {
    name                       = "AllowHTTP"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = 80
    source_address_prefix      = "Internet"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "AllowSSH"
    priority                   = 101
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = 22
    source_address_prefix      = "Internet"
    destination_address_prefix = "*"
  }
}

resource "azurerm_public_ip" "public-ip-cfms" {
  name                = "public-ip-cfms"
  resource_group_name = azurerm_resource_group.rg-cfms.name
  location            = azurerm_resource_group.rg-cfms.location
  allocation_method   = "Static"
  tags                 = var.common_tags
}

resource "azurerm_network_interface" "nic-cfms" {
  name                = "nic-cfms"
  location            = azurerm_resource_group.rg-cfms.location
  resource_group_name = azurerm_resource_group.rg-cfms.name
  tags                = var.common_tags

  ip_configuration {
    name                          = "ipconfigcfms"
    subnet_id                     = azurerm_subnet.subnet-cfms.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.public-ip-cfms.id
  }
}

resource "azurerm_network_interface_security_group_association" "example" {
  network_interface_id      = azurerm_network_interface.nic-cfms.id
  network_security_group_id = azurerm_network_security_group.nsg-cfms.id
}

resource "azurerm_virtual_machine" "vm-cfms" {
  name                  = "vm-cfms"
  location              = azurerm_resource_group.rg-cfms.location
  resource_group_name   = azurerm_resource_group.rg-cfms.name
  network_interface_ids = [azurerm_network_interface.nic-cfms.id]
  vm_size               = "Standard_D2s_v3"
  tags                  = var.common_tags

  # Uncomment this line to delete the OS disk automatically when deleting the VM
  delete_os_disk_on_termination = true

  # Uncomment this line to delete the data disks automatically when deleting the VM
  delete_data_disks_on_termination = true

  storage_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
  storage_os_disk {
    name              = "myosdisk1"
    caching           = "ReadWrite"
    create_option     = "FromImage"
    managed_disk_type = "Standard_LRS"
  }
  os_profile {
    computer_name  = "hostname"
    admin_username = "testadmin"
    admin_password = "Password1234!"
    custom_data = base64encode(file("setup.sh"))
  }
  os_profile_linux_config {
    disable_password_authentication = false
  }
}

