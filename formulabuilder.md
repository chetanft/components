## Clean Spec — Formula Builder + Condition Builder (Dropdown + Popover Logic)

### 0) Goal

Build a **generic expression builder** that can create any formula like:

* `MIN(MAX(BaseFreight * 0.18, 50), 600)`
* `ABS(COMPUTED_FREIGHT - EXPECTED_FREIGHT)`
* If/Else rules with condition rows

This spec defines **exactly when to open which menu** and **what options appear**.

---

# 1) Token Types (used for logic)

**Operator tokens**

* Assignment: `=`
* Math: `+` `−` `×` `÷`
* Parentheses: `(` `)`
* Comma: `,` *(only inside functions)*

**Value tokens**

* Charge variable (e.g., Base freight)
* Dimension value (Weight, Origin, etc.)
* Percentage-of token (e.g., `0.02% of Invoice value`)
* Constant (e.g., `50`, `₹ 5000`, `12 kg`)
* Function call (e.g., `MAX(...)`, `ABS(...)`)
* Completed group `)` counts as a value end

---

# 2) Global Menu Rule (most important)

Whenever user clicks **Edit ✎** or **X button**:

### If previous token is **operator** OR cursor is at start

Open: **VALUE PICKER**

### If previous token is **value** OR `)`

Open: **OPERATOR PICKER**

---

# 3) VALUE PICKER — Level 1 (Top Categories)

Show these categories (always):

1. **Charges**
2. **Percentage of Charge**
3. **Dimensions**
4. **Percentage of Dimensions**
5. **Constant**
6. **Functions** ✅ (MAX, MIN, ABS, CEIL, FLOOR)

Selecting a category opens Level 2.

---

# 4) VALUE PICKER — Level 2 Behavior (per category)

## 4.1 Charges

**Show:** dropdown list of all charge variables (dynamic)

* Base freight
* Fuel surcharge
* Freight on value
* ODA
* Any custom charges created in contract
* Any system computed charges if available (Computed freight, etc.)

**On select:** insert a **Charge Value token**
**Next expected menu:** Operator Picker (because token is a value)

---

## 4.2 Percentage of Charge

**UI:** inline “% of” builder

* `% input` (number)
* `Of dropdown` (target selector)

**Target selector should include**

* Charges list (same as Charges)
* Also allow key numeric dimensions (Invoice value, Weight, etc.) if needed

**On complete:** insert a single **Percentage Value token**
Example token output:

* `0.02% of Invoice value`

**Next expected menu:** Operator Picker

---

## 4.3 Dimensions

**Show:** list (generic, extensible)

* Weight
* Volume
* Invoice value
* Quantity
* Origin
* Destination
* Mode
* Service level
  *(Future add: Distance, Transit time, etc.)*

**On select:** open the **Dimension Value Builder** (Level 3) based on dimension type.

### Dimension Value Builder (Level 3)

**A) Weight**

* Numeric input + unit dropdown: `g | kg | ton`
* Output token example: `Weight` (typed numeric with unit)

**B) Volume**

* Numeric input + unit dropdown: `cm³ | m³ | ft³`
* Output token example: `Volume`

**C) Invoice value**

* Currency input with ₹ prefix
* Output token example: `Invoice value`

**D) Quantity**

* Numeric input
* Output token example: `Quantity`

**E) Origin / Destination**

* Location selector popover:

  * Search (city/pincode)
  * Zones list
  * States list
* Output token example: `Destination` (typed location)

**F) Mode**

* Enum dropdown (dynamic values like Surface, Air)
* Output token example: `Mode`

**G) Service level**

* Enum dropdown (dynamic values like Apex, etc.)
* Output token example: `Service level`

**Next expected menu:** Operator Picker

---

## 4.4 Percentage of Dimensions

Same pattern as Percentage of Charge:

* `% input`
* `Of dropdown` → should only show numeric dimensions (Weight/Volume/Invoice value/Quantity/etc.)

**On complete:** insert Percentage token
**Next expected:** Operator Picker

---

## 4.5 Constant

**Show:** constant builder (type-aware)

* Default: numeric input
* If expression context expects money: show ₹ prefix (optional)
* If inside Weight/Volume function: allow unit picker (optional)

**On complete:** insert Constant token
**Next expected:** Operator Picker

---

## 4.6 Functions (Numeric)

**List:**

* `MAX( , )` *(multi-arg)*
* `MIN( , )` *(multi-arg)*
* `ABS( )`
* `CEIL( )`
* `FLOOR( )`

**On select:** insert function template:

* `MAX( [arg1] , [arg2] )`
* `MIN( [arg1] , [arg2] )`
* `ABS( [arg1] )`
* `CEIL( [arg1] )`
* `FLOOR( [arg1] )`

**Cursor moves to first empty arg slot**
**Immediately open:** Value Picker inside that slot.

**Inside function context:**

* Comma `,` and close `)` must be allowed.
* For MAX/MIN show “+ Add argument” (optional) which adds `, [argN]`.

---

# 5) OPERATOR PICKER — Content (depends on block)

## 5.1 Formula Block Operator Picker

Show only:

* Math: `(` `)` `+` `−` `×` `÷`
* **Conditions:** `If Else Condition`

*(No relational operators here.)*

### If user clicks “If Else Condition”

Create dynamic blocks:

* IF block (with 1 empty condition row)
* “+ Add Else If”
* ELSE block (value editor)

---

## 5.2 Condition Block Operator Picker

Show:

### Relational

* `>` `<` `≥` `≤` `=` `≠`

### Logical

* `AND` `OR` `NOT`

### Range / Set

* `BETWEEN … AND …`
* `IN ( … )`
* `NOT IN ( … )`

### Parentheses

* `(` `)`

---

# 6) Condition Row Spec (inside IF / ELSE IF)

Each row layout:

* Drag handle
* Left operand dropdown (Dimension/Charge/System var)
* Operator dropdown (relational / range / set)
* Right operand input (changes by operator + type)
* Edit ✎ (optional)
* Delete

## Right operand behavior

### For normal relational operators (>, <, etc.)

Right side can be:

* Constant
* Charge
* Dimension
* Function

### BETWEEN

Right side becomes 2 inputs:

* `BETWEEN [value1] AND [value2]`

### IN / NOT IN

Right side becomes multi-select list:

* `IN (item1, item2, …)`
* `NOT IN (item1, item2, …)`

---

# 7) Auto-open rules (nice UX)

After user completes a token:

* If next expected is operator → auto-open Operator Picker when user clicks X
* If next expected is value → auto-open Value Picker when user clicks X

When inserting a function:

* Auto-open Value Picker in arg slot 1

---

# 8) Close rules

* Click outside → close current dropdown/popover
* ESC → close
* Selecting an item → close current menu and insert token
* If popover goes out of container → flip placement (top/bottom)

---

# 9) Example flows (must work)

### A) `MIN(MAX(BaseFreight * 0.18, 50), 600)`

1. `=` → Value Picker → Functions → MIN
2. Inside MIN arg1 → Value Picker → Functions → MAX
3. Inside MAX arg1 → Charges → Base freight
4. Operator Picker → `×`
5. Value Picker → Constant → `0.18`
6. MAX arg2 → Constant → `50`
7. MIN arg2 → Constant → `600`

### B) `ABS(COMPUTED_FREIGHT - EXPECTED_FREIGHT)`

1. `=` → Value Picker → Functions → ABS
2. ABS arg1 → Charges/System vars → Computed freight
3. Operator Picker → `−`
4. Value Picker → Charges/System vars → Expected freight

---

If you want, I can also give a **small JSON schema** for these menus (categories, items, types, renderers) so Cursor dev can wire it quickly.
