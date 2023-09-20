export const Constants = {
  localStorage: {
    gateway: "gateway",
    device: "device",
    binary: "binary",
    job: "job",
    job_search: "job_search",
    device_search: "device_search",
    inventory: "inventory",
    user: "user",
    inventory_search: 'inventory_search',
    binary_search: 'binary_search',
    gateway_search: 'gateway_search',
    reusable_end_device: 'end_device',
    end_user_device: 'end_user_device'
  },
  statusColor: {
    IN_PROGRESS: "orange",
    CANCELED: "red",
    DELETION_IN_PROGRESS: "grey",
    COMPLETED: "green",
  },
  userRole: {
    1: "SuperAdmin",
    2: "OEM Admin",
    3: "OEM User",
    4: "End User",
    5: "OEM Client",
  },
  userDeleteAccess: {
    "1": ["2", "3", "4", "5"],
    "2": ["3", "4", "5"],
  },
  status: {
    IN_PROGRESS: "orange",
    QUEUED: "orange",
    CANCELED: "grey",
    FAILED: "#ef4136",
    TIMED_OUT: "#ef4136",
    REJECTED: "#ef4136",
    REMOVED: "grey",
    DELETED: "grey",
    SUCCEEDED: "#51b239",
    FLASH: "orange",
  },
  ruleType: {
    1: "Event Driven Rule Type",
    2: "Schedule Rule Type",
  },
  itemsPerPage: {
    items: [10, 25, 50, 100],
    defaultItems: 100,
  },
  gatewayStatus: {
    1: "Online",
    0: "Offline",
  },
  userAssociation: {
    associated: "Associated",
    nonAssociated: "Non-Associated",
  },
};

export const FilterObject = {
  GATEWAY_FILTER: [
    {
      name: "Gateway Status",
      value: "gateway_status",
      multiSelect: true,
      input_control: "select",
      dlValues: [
        { name: "Online", value: "true" },
        { name: "Offline", value: "false" },
      ],
    }, {
      name: "Association",
      value: "user_association",
      input_control: "select",
      multiSelect: false,
      dlValues: [
        { name: "Associated", value: "associated" },
        { name: "Non-Associated", value: "nonAssociated" },
      ],
    },
    {
      name: "Gateway Name",
      value: "gateway_name",
      multiSelect: false,
      input_control: "textbox",
    },

    // {
    //   name: "Gateway Type",
    //   value: "gateway_type",
    //   multiSelect: true,
    //   input_control: "select",
    //   dlValues: [],
    //   // dlValues: [
    //   //   { name: "Centauri-200", value: "Centauri-200" },
    //   //   { name: "HB-100", value: "HB-100" },
    //   //   { name: "HB-200", value: "HB-200" },
    //   // ],
    // },
    {
      name: "OEM Name",
      value: "oem_name",
      multiSelect: false,
      input_control: "textbox",
    },
    {
      name: "MAC Address",
      value: "gateway_mac",
      multiSelect: false,
      input_control: "textbox",
    },
    {
      name: "FW Version",
      value: "gateway_fwversion",
      multiSelect: false,
      input_control: "textbox",
    },

  ],
  INVENTORY_FILTER: [
    {
      name: "MAC Address",
      value: "gateway_mac",
      multiSelect: false,
      input_control: "textbox",
    },
    {
      name: "Eth0 MAC",
      value: "eth0_mac",
      multiSelect: false,
      input_control: "textbox",
    },
    {
      name: "Eth1 MAC",
      value: "eth1_mac",
      multiSelect: false,
      input_control: "textbox",
    },
    {
      name: "Serial Number",
      value: "serial_number",
      multiSelect: false,
      input_control: "textbox",
    },
    {
      name: "OEM Name",
      value: "oem_name",
      multiSelect: false,
      input_control: "textbox",
    },
  ],
  JOB_FILTER: [
    // 1. Job Status (aws_job_status) - ComboBox
    // 4. Operation (operation) - ComboBox
    {
      name: "Job Status",
      value: "aws_job_status",
      multiSelect: true,
      input_control: "select",
      dlValues: [
        { name: "IN_PROGRESS", value: "IN_PROGRESS" },
        { name: "CANCELED", value: "CANCELED" },
        { name: "COMPLETED", value: "COMPLETED" },
      ],
    },
    {
      name: "Job Name",
      value: "job_name",
      multiSelect: false,
      input_control: "textbox",
    },
    {
      name: "OTA Package Name",
      value: "binary_name",
      multiSelect: false,
      input_control: "textbox",
    },
    {
      name: "Operation",
      value: "operation",
      multiSelect: false,
      input_control: "select",
      dlValues: [
        { name: "OTA", value: "OTA" },
        { name: "Reboot", value: "Reboot" },
        { name: "Factory Reset", value: "factoryReset" },
      ],
    },
    // {
    //   name: "Product Type",
    //   value: "product_type_name",
    //   multiSelect: false,
    //   input_control: "textbox",
    // },
  ],
  OTA_FILTER: [
    {
      name: "Package Name",
      value: "binary_name",
      multiSelect: false,
      input_control: "textbox",
    },
    // {
    //   name: "OTA Type",
    //   value: "binary_type_name",
    //   multiSelect: false,
    //   input_control: "textbox",
    // },
    // {
    //   name: "Product Type",
    //   value: "product_type_name",
    //   multiSelect: false,
    //   input_control: "textbox",
    // },
    {
      name: "Product Variant",
      value: "product_variant_name",
      multiSelect: false,
      input_control: "textbox",
    },
  ],
  GATEWAY_COLUMN_LIST: [
    {
      name: "Gateway Name",
      value: "gateway_name",
    },
    {
      name: "Gateway Status",
      value: "gateway_status",
    },
    {
      name: "Gateway Type",
      value: "gateway_type",
    },
    {
      name: "OEM Name",
      value: "oem_name",
    },
    {
      name: "MAC Address",
      value: "gateway_mac",
    },
    {
      name: "Association",
      value: "user_association",
    },
    {
      name: "User",
      value: "user",
    },
    {
      name: "FW Version",
      value: "gateway_fwversion",
    },
  ],
  DEVICE_FILTER: [
    {
      name: "Device Status",
      value: "device_status",
      multiSelect: false,
      input_control: "select",
      dlValues: [
        { name: "Online", value: "true" },
        { name: "Offline", value: "false" },
      ],
    },
    {
      name: "Device Name",
      value: "device_name",
      multiSelect: false,
      input_control: "textbox",
    }]
};

export const LogTypes = [
  "ALL",
  "DEBUG",
  "INFO",
  "WARN",
  "ERROR",
  "FATAL",
  "OFF",
  "TRACE",
];
