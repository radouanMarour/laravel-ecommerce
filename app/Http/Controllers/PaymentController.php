<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Srmklive\PayPal\Services\Paypal as PayPalClient;
use App\Models\Order;

class PaymentController extends Controller
{
    // Stripe Payment Gateway
    public function stripeCheckout(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $order = Order::findOrFail($request->order_id);

        $checkout_session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => 'Order #' . $order->id,
                    ],
                    'unit_amount' => $order->total * 100,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('orders.show', ['order_id' => $order->id]) . '?success=true',
            'cancel_url' => route('orders.show', ['order_id' => $order->id]) . '?canceled=true',
        ]);

        return response()->json(['id' => $checkout_session->id]);
    }

    // PayPal Payment Gateway 
    public function createPaypalOrder(Request $request)
    {
        $order = Order::findOrFail($request->order_id);

        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();

        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('orders.show', ['order_id' => $order->id]) . '?success=true',
                "cancel_url" => route('orders.show', ['order_id' => $order->id]) . '?canceled=true',
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => number_format($order->total, 2, '.', '')
                    ],
                    "reference_id" => $order->id
                ]
            ]
        ]);

        if (isset($response['id']) && $response['id'] != null) {
            return response()->json([
                'id' => $response['id']
            ]);
        }

        return response()->json(['error' => 'Failed to create PayPal order'], 500);
    }

    public function capturePaypalOrder(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();

        $response = $provider->capturePaymentOrder($request->id);

        if (isset($response['status']) && $response['status'] == 'COMPLETED') {
            $order = Order::where('id', $response['purchase_units'][0]['reference_id'])->first();
            $order->update(['status' => 'paid']);
            return response()->json(['success' => true]);
        }

        return response()->json(['error' => 'Payment failed'], 400);
    }
}
