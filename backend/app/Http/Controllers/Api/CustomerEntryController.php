<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CustomerEntry;
use Illuminate\Http\Request;

class CustomerEntryController extends Controller
{
    /**
     * Entry List
     */
    public function index(Request $request)
    {
        $query = CustomerEntry::with('customer');

        /**
         * Filter by customer id
         */
        if ($request->filled('customer_id')) {

            $query->where(
                'customer_id',
                $request->customer_id
            );
        }

        /**
         * Search by customer name
         */
        if ($request->filled('search')) {

            $query->whereHas('customer', function ($q) use ($request) {

                $q->where('customer_name', 'like', '%' . $request->search . '%');

            });
        }

        /**
         * Filter by payment status
         */
        if (
            $request->filled('payment_status')
            && $request->payment_status !== 'all'
        ) {

            $query->where('payment_status', $request->payment_status);
        }

        /**
         * Filter by customer type
         */
        if ($request->filled('customer_type')) {

            $query->whereHas('customer', function ($q) use ($request) {

                $q->where('customer_type', $request->customer_type);

            });
        }

        /**
         * Date filter
         */
        if ($request->filled('from_date')) {

            $query->whereDate(
                'entry_date',
                '>=',
                $request->from_date
            );
        }

        if ($request->filled('to_date')) {

            $query->whereDate(
                'entry_date',
                '<=',
                $request->to_date
            );
        }

        /**
         * Sorting
         */
        switch ($request->sort) {

            case 'amount_asc':
                $query->orderBy('amount', 'asc');
                break;

            case 'amount_desc':
                $query->orderBy('amount', 'desc');
                break;

            case 'date_asc':
                $query->orderBy('entry_date', 'asc');
                break;

            default:
                $query->orderBy('entry_date', 'desc');
                break;
        }

        // Pagination
        $entries = $query->paginate(20);

        return response()->json($entries);
    }

    /**
     * Create Entry
     */
    public function store(Request $request)
    {
        $validated = $request->validate([

            'customer_id' => 'required|exists:customers,id',

            'entry_date' => 'required|date',

            'card_sheet' => 'nullable|string|max:255',

            'sticker' => 'nullable|string|max:255',

            'size' => 'nullable|string|max:255',

            'lamination' => 'nullable|in:gloss,matt,none',

            'full_cut' => 'nullable|string|max:255',

            'plotter_cut' => 'nullable|string|max:255',

            'quantity' => 'required|integer|min:1',

            'amount' => 'required|numeric|min:0',

            'payment_status' => 'nullable|in:pending,complete',

            'remark' => 'nullable|string',
        ]);

        /**
         * Auto payment complete for local customer
         */
        $customer = \App\Models\Customer::find($validated['customer_id']);

        if ($customer->customer_type === 'local') {

            $validated['payment_status'] = 'complete';
        }

        $entry = CustomerEntry::create($validated);

        return response()->json([
            'message' => 'Entry created successfully',
            'entry' => $entry
        ], 201);
    }

    /**
     * Show Single Entry
     */
    public function show($id)
    {
        $entry = CustomerEntry::with('customer')->findOrFail($id);

        return response()->json($entry);
    }

    /**
     * Update Entry
     */
    public function update(Request $request, $id)
    {
        $entry = CustomerEntry::findOrFail($id);

        $validated = $request->validate([

            'entry_date' => 'required|date',

            'card_sheet' => 'nullable|string|max:255',

            'sticker' => 'nullable|string|max:255',

            'size' => 'nullable|string|max:255',

            'lamination' => 'nullable|in:gloss,matt,none',

            'full_cut' => 'nullable|string|max:255',

            'plotter_cut' => 'nullable|string|max:255',

            'quantity' => 'required|integer|min:1',

            'amount' => 'required|numeric|min:0',

            'payment_status' => 'nullable|in:pending,complete',

            'remark' => 'nullable|string',
        ]);

        $entry->update($validated);

        return response()->json([
            'message' => 'Entry updated successfully',
            'entry' => $entry
        ]);
    }

    /**
     * Delete Entry
     */
    public function destroy($id)
    {
        $entry = CustomerEntry::findOrFail($id);

        $entry->delete();

        return response()->json([
            'message' => 'Entry deleted successfully'
        ]);
    }
}