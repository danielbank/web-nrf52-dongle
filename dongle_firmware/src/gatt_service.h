#ifndef __GATT_SERVICE_H__
#define __GATT_SERVICE_H__

void gatt_service_init(void);
void gatt_service_heartbeat_notify(u32_t count);
void gatt_service_data_notify(const void *buf, u16_t len);

#endif
