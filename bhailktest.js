// ============================================================
// Locket RevenueCat Script - KÍCH HOẠT LOCKET GOLD
// Endpoint: ^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/[^/]+$)
// Dùng cho: Shadowrocket / Loon / Quantumult X
// ============================================================

// 1. KHAI BÁO BIẾN ĐẦU VÀO (BẮT BUỘC ĐỂ ĐỌC DỮ LIỆU)
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = {};

try {
  obj = JSON.parse($response.body);
} catch (e) {
  $done({});
}

// 2. DỮ LIỆU GÓI MUA (GIỮ NGUYÊN BẢN GỐC CỦA TÁC GIẢ)
const mapping = {
  'Locket': ['Gold']
};

var Bhai = {
      auto_resume_date: null,
      display_name: "locket_1600_1y",
      is_sandbox: true, // Giữ nguyên true theo bản gốc TestFlight
      ownership_type: "PURCHASED",
      billing_issues_detected_at: null,
      management_url: "https://apps.apple.com/account/subscriptions",
      period_type: "normal",
      price: {
          "amount": 399000.0,
          "currency": "VND"
      },
      expires_date: "9999-10-17T10:10:14Z",
      grace_period_expires_date: null,
      refunded_at: null,
      unsubscribe_detected_at: null,
      original_purchase_date: "2005-10-17T10:10:15Z",
      purchase_date: "2005-10-17T10:10:14Z",
      store: "app_store",
      store_transaction_id: "2000001108724193"
  },
  locketGold = {
      grace_period_expires_date: null,
      purchase_date: "2005-10-17T10:10:14Z",
      product_identifier: "locket_1600_1y",
      expires_date: "9999-10-17T10:10:14Z"
  };

// 3. KHỞI TẠO CẤU TRÚC DỮ LIỆU AN TOÀN
obj.subscriber = obj.subscriber || {};
obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
obj.subscriber.entitlements = obj.subscriber.entitlements || {};

// 4. XỬ LÝ GÁN GÓI CƯỚC VÀO TÀI KHOẢN
const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [e, s] = mapping[match];
  if (s) {
    locketGold.product_identifier = s;
    obj.subscriber.subscriptions[s] = Bhai;
  } else {
    obj.subscriber.subscriptions["locket_1600_1y"] = Bhai;
  }
  // Gán quyền Gold (cả chữ hoa lẫn thường để không bị sót)
  obj.subscriber.entitlements[e] = locketGold;
  obj.subscriber.entitlements["gold"] = locketGold;
} else {
  obj.subscriber.subscriptions["locket_1600_1y"] = Bhai;
  obj.subscriber.entitlements.pro = locketGold;
  obj.subscriber.entitlements.Gold = locketGold;
}

$done({
  body: JSON.stringify(obj)
});