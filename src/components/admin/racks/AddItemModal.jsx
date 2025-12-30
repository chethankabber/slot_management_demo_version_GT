import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import NotificationToast from "../../common/NotificationToast";
/* ------------------ EMPTY STATE ------------------ */
const emptyState = {
  name: "",
  quantity: 1,
  itemCategory: "",
  componentType: "",
  componentTypeOther: "",
  package: "",
  packageOther: "",
  partNumber: "",
  manufacturer: "",
  value: "",
  tolerance: "",
  voltageRating: "",
  currentRating: "",
  displayType: "",
  displayTypeOther: "",
  displayInterface: "",
  displayInterfaceOther: "",
  displayColor: "",
  displayColorOther: "",
  protectionType: "",
  protectionTypeOther: "",
  protectionLocation: "",
  protectionLocationOther: "",
  moduleType: "",
  moduleTypeOther: "",
};

const AddItemModal = ({
  show,
  onClose,
  onSubmit,
  slotNumber,
  mode = "add",
  initialData = null,
}) => {
  const [data, setData] = useState(emptyState);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });
  /* ------------------ LOAD EDIT DATA ------------------ */
  useEffect(() => {
    if (mode === "edit" && initialData && show) {
      console.log("Edit mode - initialData:", initialData);
      console.log("itemCategory:", initialData.itemCategory);
      setData({
        ...emptyState,
        name: initialData.itemName || initialData.name || "",
        quantity: initialData.total || initialData.quantity || 1,
        itemCategory: initialData.itemCategory || "",
        componentType: initialData.componentType || "",
        componentTypeOther: initialData.componentTypeOther || "",
        package: initialData.package || "",
        packageOther: initialData.packageOther || "",
        partNumber: initialData.partNumber || "",
        manufacturer: initialData.manufacturer || "",
        value: initialData.value || "",
        tolerance: initialData.tolerance || "",
        voltageRating: initialData.voltageRating || "",
        currentRating: initialData.currentRating || "",
        displayType: initialData.displayType || "",
        displayTypeOther: initialData.displayTypeOther || "",
        displayInterfaceOther: initialData.displayInterfaceOther || "",
        displayInterface: initialData.displayInterface || "",
        displayColor: initialData.displayColor || "",
        displayColorOther: initialData.displayColorOther || "",
        protectionType: initialData.protectionType || "",
        protectionTypeOther: initialData.protectionTypeOther || "",
        protectionLocation: initialData.protectionLocation || "",
        protectionLocationOther: initialData.protectionLocationOther || "",
        moduleType: initialData.moduleType || "",
        moduleTypeOther: initialData.moduleTypeOther || "",
      });
    }

    if (mode === "add" && show) {
      setData(emptyState);
    }
  }, [mode, initialData, show]);

  /* ------------------ OPTIONS ------------------ */
  const categories = [
    "Passive Component",
    "Discrete Component",
    "Power Component",
    "MCU / Processor",
    "Memory IC",
    "Interface / Support IC",
    "Analog IC",
    "Sensor",
    "Connector",
    "Switch / Button",
    "Module",
    "Display",
    "Protection Component",
    "Mechanical",
    "Cable / Wire",
    "Tool / Accessory",
    "Others",
  ];

  const componentTypeOptions = {
    "Passive Component": [
      "Resistor",
      "Capacitor",
      "Inductor",
      "Ferrite Bead",
      "Thermistor",
      "Varistor",
      "Crystal / Resonator",
    ],
    "Discrete Component": [
      "Diode",
      "Zener Diode",
      "LED",
      "Transistor BJT",
      "MOSFET",
      "IGBT",
    ],
    "Power Component": [
      "LDO Regulator",
      "Buck Converter",
      "Boost Converter",
      "Buck-Boost Converter",
      "PMIC",
      "DC-DC Module",
      "Battery Charger"

    ],
    "MCU / Processor": [
      "Microcontroller",
      "Microprocessor",
      "SoC"
    ],
    "Interface / Support IC": [
      "CAN Transceiver",
      "USB Interface",
      "RS485 Transceiver",
      "Ethernet PHY",
      "GPIO Expander",
      "RTC",
      "Watchdog",
      "UART Transceiver"
    ],
    "Analog IC": [
      "Operational Amplifier",
      "Comparator",
      "Instrumentation Amplifier",
      "Audio Amplifier",
      "Analog Switch / MUX",
      "ADC",
      "DAC",
      "Voltage Reference",
      "Current Sense Amplifier",
      "Analog Front-End (AFE)"
    ],
    "Sensor": [
      "Temperature",
      "Pressure",
      "Accelerometer",
      "Gyroscope",
      "Magnetometer",
      "Proximity",
      "Gas",
      "Current",
      "Voltage",
    ],
    "Connector": [
      "Board-to-Wire",
      "Board-to-Board",
      "Wire-to-Wire"
    ],
    "Switch / Button": [
      "Tactile Switch",
      "Toggle Switch",
      "Push Button",
      "Slide Switch",
      "DIP Switch",
      "Rotary Switch",
      "Micro Switch",
      "Rocker Switch",
      "Reed Switch",
      "Foot Switch",
      "Limit Switch"
    ],
    "Memory IC": [
      "SRAM",
      "SDRAM",
      "SPI Flash",
      "QSPI Flash",
      "EEPROM",
      "FRAM"
    ],
    "Mechanical": [
      "Spacer / Standoff",
      "Screw",
      "Nut",
      "Washer",
      "Heatsink",
      "Enclosure",
      "Bracket",
      "Clip"
    ],
    "Cable / Wire": [
      "Ribbon Cable",
      "Jumper Wire",
      "USB Cable",
      "Power Cable",
      "Coaxial Cable",
      "Ethernet Cable",
      "FFC / FPC Cable",
      "HDMI Cable",
      "DP cable",
      "DP9 cable",
      "FRC Cable"
    ],
    "Tool / Accessory": [
      "Multimeter",
      "Oscilloscope",
      "Logic Analyzer",
      "Power Supply",
      "Crimping Tool",
      "Wire Stripper",
      "Tweezers",
      "Screwdriver",
      "Solder Wire",
      "Flux",
      "Solder Wick",
      "ESD Wrist Strap"
    ],


  }
  const moduleTypes = [
    "Wireless Module",
    "Power Module",
    "Sensor Module",
    "Communication Module",
    "Display Module",
  ];

  const packageOptions = [
    "0201", "0402", "0603", "0805", "1206",
    "SOT-23", "SOIC-8", "QFN-32", "QFN-48",
    "LQFP-64", "LQFP-100", "BGA", "WLCSP",
  ];

  const displayTypes = ["LCD", "OLED", "TFT LCD", "E-Ink", "LED Matrix", "7-Segment"];
  const displayInterfaces = ["SPI", "I2C", "Parallel", "LVDS", "MIPI-DSI"];
  const displayColors = ["Monochrome", "RGB", "RGB565", "RGB888"];

  const protectionTypes = ["TVS Diode", "ESD Diode", "Polyfuse (PTC)", "Fuse", "MOV"];
  const protectionLocations = ["Power Line", "Signal Line", "USB", "Ethernet", "CAN", "RS485"];

  /* ------------------ FLAGS ------------------ */
  const showBaseFields = data.itemCategory && data.itemCategory !== "Others";
  const isPassive = data.itemCategory === "Passive Component";
  const isDiscrete = data.itemCategory === "Discrete Component";
  const isDisplay = data.itemCategory === "Display";
  const isProtection = data.itemCategory === "Protection Component";
  const isModule = data.itemCategory === "Module";




  /* ------------------ SUBMIT ------------------ */
  const handleSubmit = () => {
    // Validation
    if (!data.name.trim()) {
      setToast({
        show: true,
        message: "🚨 Please enter Item Name",
        bg: "dark",
      });
      return;
    }
    if (!data.itemCategory) {  
      setToast({
        show: true,
        message: "🚨 Please select Item Category",
        bg: "secondary",
      });
      return;
    }
    if (data.quantity < 1) {   
      setToast({
        show: true,
        message: "🚨 Quantity must be at least 1",
        bg: "secondary",
      });
      return;
    }

    // Category-specific validation
    if (data.itemCategory !== "Others") {
      if ((isPassive || isDiscrete) && !data.componentType) {
        setToast({
        show: true,
        message: "🚨 Please select Component Type",
        bg: "secondary",
      });
        return;
      }
      if (isModule && !data.moduleType) {  
        setToast({
          show: true,
          message: "🚨 Please select Module Type",
          bg: "secondary",
        });
        return;
      }
      if (isDisplay && (!data.displayType || !data.displayInterface || !data.displayColor)) { 
        setToast({
        show: true,
        message: "🚨 Please fill all Display fields",
        bg: "secondary",
      });
        return;
      }
      if (isProtection && (!data.protectionType || !data.protectionLocation)) { 
        setToast({
          show: true,
          message: "🚨 Please fill all Protection fields",
          bg: "secondary",
        });
        return;
      }
      if (!isDisplay && !isProtection && !data.package) { 
        setToast({
          show: true,
          message: "🚨 Please select Package",
          bg: "secondary",
        });
        return;
      }
    }

    // Prepare data with "Other" handling
    const submitData = {
      name: data.name.trim(),
      quantity: Number(data.quantity),
      itemCategory: data.itemCategory,
      componentType: data.componentType === "Other" ? data.componentTypeOther : data.componentType,
      package: data.package === "Other" ? data.packageOther : data.package,
      partNumber: data.partNumber,
      manufacturer: data.manufacturer,
      value: data.value,
      tolerance: data.tolerance,
      voltageRating: data.voltageRating,
      currentRating: data.currentRating,
      displayType: data.displayType === "Other" ? data.displayTypeOther : data.displayType,
      displayInterface: data.displayInterface === "Other" ? data.displayInterfaceOther : data.displayInterface,
      displayColor: data.displayColor === "Other" ? data.displayColorOther : data.displayColor,
      protectionType: data.protectionType === "Other" ? data.protectionTypeOther : data.protectionType,
      protectionLocation: data.protectionLocation === "Other" ? data.protectionLocationOther : data.protectionLocation,
      moduleType: data.moduleType === "Other" ? data.moduleTypeOther : data.moduleType,
    };

    // For edit mode, include itemId
    if (mode === "edit" && initialData) {
      submitData.itemId = initialData.itemId || initialData.id;
    }

    onSubmit(submitData);
    setData(emptyState);
    onClose();
  };

  /* ------------------ UI ------------------ */
  return (
    <Modal show={show} onHide={onClose} centered size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          Slot {slotNumber} – {mode === "edit" ? "Edit Item" : "Add Item"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Item Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Enter item name"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Item Category <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  value={data.itemCategory}
                  disabled={mode === "edit" && data.itemCategory !== ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      itemCategory: e.target.value,
                      componentType: "",
                      moduleType: "",
                    })
                  }
                >
                  <option className="text-muted text-center" value="">----- Select category -----</option>

                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Form.Select>
                {mode === "edit" && (
                  <Form.Text className="text-muted">
                    You can not change the Category.
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Quantity <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={data.quantity}
              onChange={(e) => setData({ ...data, quantity: Number(e.target.value) })}
            />
          </Form.Group>

          {showBaseFields && (
            <>
              <hr className="my-4" />
              <h6 className="mb-3">Component Details</h6>

              <Row>
                {/* Component Type - Passive/Discrete */}
                {(!isDisplay && !isProtection && !isModule) && (
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Component Type <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        value={data.componentType}
                        onChange={(e) => setData({ ...data, componentType: e.target.value })}
                      >
                        <option className="text-muted" value="">--Select type--</option>
                        {componentTypeOptions[data.itemCategory]?.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                    {data.componentType === "Other" && (
                      <Form.Group className="mb-3">
                        <Form.Control
                          value={data.componentTypeOther}
                          onChange={(e) => setData({ ...data, componentTypeOther: e.target.value })}
                          placeholder="Enter custom type (optional)"
                        />
                      </Form.Group>
                    )}
                  </Col>
                )}

                {/* Module Type */}
                {isModule && (
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Module Type <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        value={data.moduleType}
                        onChange={(e) => setData({ ...data, moduleType: e.target.value })}
                      >
                        <option className="text-muted" value="">--Select module type--</option>
                        {moduleTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                    {data.moduleType === "Other" && (
                      <Form.Group className="mb-3">
                        <Form.Control
                          value={data.moduleTypeOther}
                          onChange={(e) => setData({ ...data, moduleTypeOther: e.target.value })}
                          placeholder="Enter custom module type (optional)"
                        />
                      </Form.Group>
                    )}
                  </Col>
                )}

                {/* Package - all except Display/Protection */}
                {!isDisplay && !isProtection && (
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Package <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        value={data.package}
                        onChange={(e) => setData({ ...data, package: e.target.value })}
                      >
                        <option className="text-muted" value="">--Select package--</option>
                        {packageOptions.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                    {data.package === "Other" && (
                      <Form.Group className="mb-3">
                        <Form.Control
                          value={data.packageOther}
                          onChange={(e) => setData({ ...data, packageOther: e.target.value })}
                          placeholder="Enter custom package (optional)"
                        />
                      </Form.Group>
                    )}
                  </Col>
                )}
              </Row>

              {/* Display Fields */}
              {isDisplay && (
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Display Type <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        value={data.displayType}
                        onChange={(e) => setData({ ...data, displayType: e.target.value })}
                      >
                        <option className="text-muted" value="">--Select type--</option>
                        {displayTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                    {data.displayType === "Other" && (
                      <Form.Group className="mb-3">
                        <Form.Control
                          value={data.displayTypeOther}
                          onChange={(e) => setData({ ...data, displayTypeOther: e.target.value })}
                          placeholder="Custom type (optional)"
                        />
                      </Form.Group>
                    )}
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Display Interface <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        value={data.displayInterface}
                        onChange={(e) => setData({ ...data, displayInterface: e.target.value })}
                      >
                        <option className="text-muted" value="">--Select interface--</option>
                        {displayInterfaces.map((i) => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                    {data.displayInterface === "Other" && (
                      <Form.Group className="mb-3">
                        <Form.Control
                          value={data.displayInterfaceOther}
                          onChange={(e) => setData({ ...data, displayInterfaceOther: e.target.value })}
                          placeholder="Custom interface (optional)"
                        />
                      </Form.Group>
                    )}
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Display Color <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        value={data.displayColor}
                        onChange={(e) => setData({ ...data, displayColor: e.target.value })}
                      >
                        <option className="text-muted" value="">--Select color--</option>
                        {displayColors.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                    {data.displayColor === "Other" && (
                      <Form.Group className="mb-3">
                        <Form.Control
                          value={data.displayColorOther}
                          onChange={(e) => setData({ ...data, displayColorOther: e.target.value })}
                          placeholder="Custom color (optional)"
                        />
                      </Form.Group>
                    )}
                  </Col>
                </Row>
              )}

              {/* Protection Fields */}
              {isProtection && (
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Protection Type <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        value={data.protectionType}
                        onChange={(e) => setData({ ...data, protectionType: e.target.value })}
                      >
                        <option className="text-muted" value="">--Select type--</option>
                        {protectionTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                    {data.protectionType === "Other" && (
                      <Form.Group className="mb-3">
                        <Form.Control
                          value={data.protectionTypeOther}
                          onChange={(e) => setData({ ...data, protectionTypeOther: e.target.value })}
                          placeholder="Custom type (optional)"
                        />
                      </Form.Group>
                    )}
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Protection Location <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        value={data.protectionLocation}
                        onChange={(e) => setData({ ...data, protectionLocation: e.target.value })}
                      >
                        <option className="text-muted" value="">--Select location--</option>
                        {protectionLocations.map((l) => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                    {data.protectionLocation === "Other" && (
                      <Form.Group className="mb-3">
                        <Form.Control
                          value={data.protectionLocationOther}
                          onChange={(e) => setData({ ...data, protectionLocationOther: e.target.value })}
                          placeholder="Custom location (optional)"
                        />
                      </Form.Group>
                    )}
                  </Col>
                </Row>
              )}

              {/* Optional Base Fields */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Part Number</Form.Label>
                    <Form.Control
                      value={data.partNumber}
                      onChange={(e) => setData({ ...data, partNumber: e.target.value })}
                      placeholder="Optional"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Manufacturer</Form.Label>
                    <Form.Control
                      value={data.manufacturer}
                      onChange={(e) => setData({ ...data, manufacturer: e.target.value })}
                      placeholder="Optional"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Passive Component Fields */}
              {isPassive && (
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Value</Form.Label>
                      <Form.Control
                        value={data.value}
                        onChange={(e) => setData({ ...data, value: e.target.value })}
                        placeholder="e.g., 10k, 100nF"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tolerance</Form.Label>
                      <Form.Control
                        value={data.tolerance}
                        onChange={(e) => setData({ ...data, tolerance: e.target.value })}
                        placeholder="e.g., 5%, 1%"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Voltage Rating</Form.Label>
                      <Form.Control
                        value={data.voltageRating}
                        onChange={(e) => setData({ ...data, voltageRating: e.target.value })}
                        placeholder="e.g., 50V"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              )}

              {/* Discrete Component Fields */}
              {isDiscrete && (
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Rating</Form.Label>
                      <Form.Control
                        value={data.currentRating}
                        onChange={(e) => setData({ ...data, currentRating: e.target.value })}
                        placeholder="e.g., 1A, 500mA"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Voltage Rating</Form.Label>
                      <Form.Control
                        value={data.voltageRating}
                        onChange={(e) => setData({ ...data, voltageRating: e.target.value })}
                        placeholder="e.g., 30V"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Back
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {mode === "edit" ? "Update Item" : "Save Item"}
        </Button>
      </Modal.Footer>
      <NotificationToast
        show={toast.show}
        message={toast.message}
        bg={toast.bg}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </Modal>
  );
};

export default AddItemModal; 